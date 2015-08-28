module Roma
  class Stats

      attr_accessor :port

      attr_accessor :run_recover
      attr_accessor :run_release
      attr_accessor :run_join
      attr_accessor :run_balance

      attr_accessor :write_count
      attr_accessor :read_count
      attr_accessor :delete_count
      attr_accessor :out_count
      attr_accessor :out_message_count
      attr_accessor :redundant_count

      attr_accessor :latency_log
      attr_accessor :latency_check_cmd
      attr_accessor :latency_check_time_count

      attr_accessor :log_level

    def initialize
      @port = [10001, 10002, 10003, 10004, 10005]
      @run_recover = false
      @run_release = false
      @run_join = false
      @run_balance = false
      @write_count = 0
      @read_count = 0
      @delete_count = 0
      @out_count = 0
      @out_message_count = 0
      @redundant_count = 0
      @latency_log = false
      @latency_check_cmd =["get", "set", "delete"]
      @latency_check_time_count = false
      #@latency_data = Hash.new { |hash,key| hash[key] = {} } #double hash
      @log_level = :debug
    end

    def get_stat()
      ret = {}
      ret['stats.config_path'] = '/home/roma/app/config.rb'
      ret['stats.address'] = 'localhost'
      ret['stats.port'] = @port[0]
      ret['stats.daemon'] = true
      ret['stats.name'] = 'ROMA'
      ret['stats.verbose'] = false
      ret['stats.enabled_repetition_host_in_routing'] = true
      ret['stats.run_recover'] = @run_recover
      ret['stats.run_sync_routing'] = false
      ret['stats.run_iterate_storage'] = false
      ret['stats.run_storage_clean_up'] = false
      ret['stats.run_receive_a_vnode'] = {}
      ret['stats.run_release'] = @run_release
      ret['stats.run_join'] = @run_join
      ret['stats.run_balance'] = @run_balance
      ret['stats.gui_run_snapshot'] = false
      ret['stats.last_clean_up'] = Time.now
      ret['stats.gui_last_snapshot'] = []
      ret['stats.spushv_protection'] = false
      ret['stats.stream_copy_wait_param'] = 0.001
      ret['stats.stream_show_wait_param'] = 0.001
      ret['stats.dcnice'] = 3
      ret['stats.clean_up_interval'] = 300
      ret['stats.size_of_zredundant'] = 0
      ret['stats.write_count'] = @write_count
      ret['stats.read_count'] = @read_count
      ret['stats.delete_count'] = @delete_count
      ret['stats.out_count'] = @out_count
      ret['stats.out_message_count'] = @out_message_count
      ret['stats.redundant_count'] = @redundant_count
      ret['stats.hilatency_warn_time'] = 5.0
      ret['stats.wb_command_map'] = {}
      ret['stats.latency_log']  = @latency_log
      ret['stats.latency_check_cmd']  = @latency_check_cmd
      ret['stats.latency_check_time_count']  = @latency_check_time_count
      ret['stats.spushv_klength_warn'] = 1024
      ret['stats.spushv_vlength_warn'] = 1048576
      ret['stats.spushv_read_timeout'] = 100
      ret['stats.reqpushv_timeout_count'] = 300
      ret['stats.routing_trans_timeout'] = 10800
      ret['stats.log_shift_size'] = 10485760
      ret['stats.log_shift_age'] =10
      ret['stats.log_level'] = @log_level
      ret
    end

  end # End of class Stats
end # End of module Roma 
