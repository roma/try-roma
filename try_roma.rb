require 'sinatra'
require 'thread'
require 'time'
require 'json'
require_relative 'base'
include TryRomaAPI

configure do
  use Rack::Session::Pool, :expire_after => 3600 # 10min
end

helpers do
  include Rack::Utils
  alias_method :h, :escape_html
end

before do
  logger.info 'execute BEFORE!!!'
  # response of stat command
  session[:version]      = Roma::Version.new      unless session[:version]
  session[:config]       = Roma::Config.new       unless session[:config]
  session[:stats]        = Roma::Stats.new        unless session[:stats]
  session[:storage]      = Roma::Storage.new      unless session[:storage]
  session[:write_behind] = Roma::WriteBehind.new  unless session[:write_behind]
  session[:routing]      = Roma::Routing.new      unless session[:routing]
  session[:connection]   = Roma::Connection.new   unless session[:connetion]
  session[:others]       = Roma::Others.new       unless session[:others]
end

after do
  if params[:command]
    session[:lastcmd] = params[:command]
  else
    if request.path_info =~ /^\/([a-z]+).*/
      session[:lastcmd] = $1
    end
  end
end

get '/' do
  erb :tryroma
end

###[GET]============================================================================================================
# stat/stats [regexp]
get %r{/stat[s]{0,1}/?(.*)?} do |regexp|
  all_list = session[:version].get_stat\
           .merge(session[:config].get_stat)\
           .merge(session[:stats].get_stat)\
           .merge(session[:storage].get_stat)\
           .merge(session[:write_behind].get_stat)\
           .merge(session[:routing].get_stat)\
           .merge(session[:connection].get_stat)\
           .merge(session[:others].get_stat)
 
  h = all_list.select{|k, v| k =~ /#{regexp}/}
  h.each{|k, v|
    h[k] = v.to_s
  }
  return h.to_json
end

# whoami/nodelist/version
get %r{^/(whoami|nodelist|version)$} do |cmd|
  case cmd
  when 'whoami'
    @res = session[:stats].get_stat['stats.name']
  when 'nodelist'
    @res = session[:routing].get_stat['routing.nodes'].join(' ')
  when 'version'
    @res = "VERSION ROMA-#{session[:version].get_stat['version']}"
  end

  session[:lastcmd] = cmd

  @res
end

# get/gets <key>
get %r{/(get[s]*)/(.*)}  do |cmd, k|
  if v = request.cookies[k]
    h = revert_hash_from_string(v)
    value = h['value']
    clk   = h['clk'] if cmd == 'gets'

    @res = "VALUE #{k} 0 #{value.size} #{clk}<br>#{value}<br>END<br>"
  else
    @res = "END<br>"
  end

  @res
end

###[DELETE]============================================================================================================
# balse, shutdown, shutdown_self, (rbalse)
delete '/' do
  cmd = params[:command]
  confirm = params[:confirmation]

  unless cmd.empty?  
    if res = Roma::FinishCommand.new.list[cmd]
      if confirm == 'yes'
        case cmd
        when /^(shutdown_self)$/
          @res = 'BYE<br>Connection closed by foreign host.'
          kill_instance(:single)
        when /^(balse|shutdown)$/
          @res = make_response_of_nodelist('BYE').to_s + '<br>Connection closed by foreign host.'
          kill_instance(:all)
        end
      elsif confirm.empty? && confirm != 'nothing'
        @res = res
      else
        @res = 'Connection closed by foreign host.'
      end
    else
      raise TryRomaAPINoCommandError.new(params[:command])
    end
  else
    raise TryRomaAPIArgumentError.new(params[:command])
  end

  @res
end

###[POST]============================================================================================================
# set, add, delete, replace, append, prepend, cas, set_expt, incr, decr, delete
post '/' do
  cmd = params[:command]
  k = params[:key]
  exp = params[:exptime].to_i
  val_size = params[:bytes].to_i
  cas = params[:casid].to_i
  v = params[:value]
  digit = params[:digit].to_i

  if can_i_set?(cmd, k)
    case cmd
    when /^(set|add|replace|append|prepend)$/
      raise TryRomaAPIArgumentError unless argumentcheck(k, v, exp, val_size)
      set_data(cmd, k, v, exp, val_size)
      @res = "STORED"

    when /^set_expt$/
      raise TryRomaAPIArgumentError unless argumentcheck(k, exp)
      set_data(cmd, k, request.cookies[k], exp)
      @res = "STORED"

    when /^(cas)$/
      raise TryRomaAPIArgumentError unless argumentcheck(k, v, exp, val_size, cas)
      h = revert_hash_from_string(request.cookies[k])
      if cas == h['clk']
        set_data(cmd, k, v, exp, val_size)
        @res = "STORED"
      else
        @res = "EXISTS"
      end

    when /^(incr|decr)$/ 
      raise TryRomaAPIArgumentError unless argumentcheck(k, digit)
      if !digit.kind_of?(Integer)
        if digit =~ /^(\d+).+/
          digit = $1
        else
          digit = 0
        end
      end
      digit = -digit if $1 == 'decr'

      h = revert_hash_from_string(request.cookies[k])
      if h['value'].kind_of?(Integer)
        sum = h['value'] + digit
      else
        sum = digit
      end
      sum = 0 if sum < 0

      set_data(cmd, k, {'value' => sum, 'clk' => h['clk'] + 1})
      @res = sum.to_s

    when /^(delete)$/
      raise TryRomaAPIArgumentError unless argumentcheck(k)
      if request.cookies[k]
        response.delete_cookie k
        @res = "DELETED"
      else
        @res = "NOT_FOUND"
      end
    end
  else
    @res = "NOT_STORED" if cmd =~ /(add|replace|append|prepend)$/
    @res = "NOT_FOUND" if cmd =~ /^(delete|incr|decr|cas)$/
  end

  @res
end

###[PUT]============================================================================================================
# release, recover, set_auto_recover, set_lost_action, set_log_level
put '/' do
  cmd = params[:command]
  raise TryRomaAPINoCommandError unless argumentcheck(cmd)

  case cmd
  when 'release'
    if can_i_release?
      logger.info 'release process has been started.'
      session[:stats].run_release = true

      run_pri = true
      run_sec1 = true
      run_sec2 = true
      Thread.new do
        begin
          loop{
            # decreasing
            session[:routing].primary -= 5 if run_pri
            session[:routing].secondary1 -= 5 if run_sec1
            session[:routing].secondary2 -= 5 if run_sec2

            # check value
            if session[:routing].primary <= 0
              session[:routing].primary = 0
              run_pri = false
            end
            if session[:routing].secondary1 <= 0
              session[:routing].secondary1 = 0
              run_sec1 = false
            end
            if session[:routing].secondary2 <= 0
              session[:routing].secondary2 = 0
              run_sec2 = false
            end

            # debug
            if run_pri || run_sec1 || run_sec2
              logger.info "primary:    #{session[:routing].primary}" 
              logger.info "secondary1: #{session[:routing].secondary1}"
              logger.info "secondary2: #{session[:routing].secondary2}"
            end
            break if !run_pri && !run_sec1 && !run_sec2
            sleep 2
          }
         
        rescue => e
          logger.info e
        ensure
          session[:stats].run_release = false
          logger.info 'release processs has been finished.'
        end
      end
      @res = 'STRTED'
    else
      @res = "release:Sufficient nodes do not found."
    end

    return @res

  when 'recover'
    if can_i_recover?
      logger.info 'recover process has been starteda.'
      session[:stats].run_recover = true

      run_short = true
      Thread.new do
        begin
          loop{
            # decreasing
            session[:routing].short_vnodes -= 20 if run_short

            # check value
            if session[:routing].short_vnodes <= 0
              session[:routing].short_vnodes = 0
              run_short = false
            end

            # debug
            if run_short
              logger.info "short_vnodes:    #{session[:routing].short_vnodes}" 
            end
            break if !run_short

            sleep 2
          }
 
        rescue => e
          logger.info e
        ensure
          session[:stats].run_recover = false
          logger.info 'recover processs has been finished.'
        end
      end
      @res = make_response_of_nodelist('STARTED')
    end

    @res

  when 'set_auto_recover'
    bool = params[:bool]
    sec = params[:sec]

    raise TryRomaAPIArgumentError unless argumentcheck(bool)

    if argumentcheck(sec)
      raise TryRomaAPIArgumentError.new(sec) if  sec !~ /^\d+$/
      session[:routing].auto_recover_time = sec.to_i
    end
    session[:routing].auto_recover = bool.to_bool
    @res = make_response_of_nodelist('STORED')

    @res

  when 'set_lost_action'
    action = params[:lost]
    raise TryRomaAPIArgumentError unless argumentcheck(action)

    if session[:routing].lost_action !~ /^(auto_assign|shutdown)$/
      @res = 'CLIENT_ERROR can use this command only current lost action is auto_assign or shutdwn mode'
    else
      if action !~ /^(auto_assign|shutdown)$/
        @res = 'CLIENT_ERROR changing lost_action must be auto_assign or shutdown' if action !~ /^(auto_assign|shutdown)$/
      else
        session[:routing].lost_action = action
        @res = make_response_of_nodelist('STORED')
      end
    end

    @res

  when 'set_log_level'
    log_level = params[:level]
    raise TryRomaAPIArgumentError unless argumentcheck(log_level)

    if log_level =~ /^(debug|info|warn|error)$/
      session[:stats].log_level = log_level.to_sym
      @res = 'STORED'
    else
      raise TryRomaAPIArgumentError.new('CLIENT_ERROR no match log-level string')
    end

    @res

  else
    raise TryRomaAPINoCommandError.new(params[:command])
  end
end

not_found do
  @res = "TryRomaAPI do NOT support this commad."
end

private
class String
  def to_bool
    return self if self.class.kind_of?(TrueClass) || self.class.kind_of?(FalseClass)

    if self =~ /^(true|false)$/
      return true if $1 == 'true'
      return false if $1 == 'false'
    else
      raise TryRomaAPIArgumentError.new("ERROR: #{self} is Unexpected Style.")
    end
  end
end

def argumentcheck(*array)
logger.info array
  array.each{|i|
    return false if i.to_s.empty?
  }
  true
end

def make_response_of_nodelist(res)
  node_list = session[:routing].version_of_nodes
  node_list.each{|k, v|
    node_list[k] = res
  }
  node_list 
end

def kill_instance(type)
  if type == :single
    session[:stats].port.shift
    session[:routing].version_of_nodes.shift
    session[:routing].event.push("#{Time.now.iso8601} leave #{session[:routing].nodes.shift}")
    session[:routing].short_vnodes += session[:routing].primary + session[:routing].secondary1 + session[:routing].secondary2
    session[:routing].primary = 152 if session[:routing].primary == 0
    session[:routing].secondary1 = 106 if session[:routing].secondary1 == 0
    session[:routing].secondary2 = 133 if session[:routing].secondary2 == 0
    session[:routing].short_vnodes = 512 if session[:routing].short_vnodes > 512
    if session[:stats].port.empty?
      logger.info 'All ROMA instance have Stopped!'
      session.clear
    end
  elsif type == :all
    logger.info 'All ROMA instance have Stopped!'
    session.clear
  else
    raise TryRomaAPIArgumentError.new('Unexpected type argument was sent.')
  end
end

def can_i_recover?
  if session[:stats].run_recover
    @res = 'SERVER_ERROR Recover process is already running.'
    return false
  elsif session[:routing].nodes.length < session[:routing].redundant
    @res = 'SERVER_ERROR nodes num < redundant num'
    return false
  end

  true
end

def can_i_release?
  if session[:stats].run_release || (session[:routing].nodes.length <= session[:routing].redundant)
    return false
  end

  true
end

def can_i_set?(command, key)
  if command =~ /^(add)$/
    return false if request.cookies[key]
  elsif command =~ /^(replace|append|prepend|cas|incr|decr|delete)$/
    return false unless request.cookies[key]
  elsif command =~ /^(set)$/
    return true
  end
  true
end

def set_data(cmd, key, value, exptime=(10 * 60), val_size=nil)
  exptime = check_exp_time(exptime) 

  if cmd =~ /^(set_expt|incr|decr)$/
    value_hash = value
  else
    value_hash = value_setting(cmd, key, value, val_size)
  end

  case cmd
  when /^(incr|decr)$/
    response.set_cookie(key, :value => value_hash)
  else
    response.set_cookie(key, :value => value_hash, :expires => exptime)
  end
  true
end

def check_exp_time(time)
  if time <= 0 || time > 10 * 60
    return Time.now + (10 * 60)
  else
    return Time.now + time
  end
end

def value_setting(cmd, k, v, val_size)
  if request.cookies[k]
    h = revert_hash_from_string(request.cookies[k])
    pre_v = h['value']
    pre_clk = h['clk']
  end

  case cmd
  when /^(set|add|replace|cas)$/
    value = v.slice(0, val_size)
  when 'append'
    value = pre_v.concat(v.slice(0, val_size))
  when 'prepend'
    value = pre_v.prepend(v.slice(0, val_size))
  end

  if pre_clk
    h = {'value' => value, 'clk' => pre_clk += 1 }
  else
    h =  {'value' => value, 'clk' => 0 }
  end

  return h 
end

def revert_hash_from_string(str)
  if !str.kind_of?(String)
    raise TryRomaAPINoMethodError.new("undefined method `#{__method__}' for '#{str}':#{str.class}")
  elsif str[0] != '{'
    raise TryRomaAPIUnexpectedStyleError.new("'#{str}' is NOT start from '{'")
  end

  str = str.chomp.gsub(/"|^{|}$/, '')
  str = str.split(/,[\s]*|=>/)
  str.each_with_index{|column, idx|
    str[idx] = column.to_i if column =~ /^\d+$/
  }

  Hash[*str]
end

