module Roma
  class WriteBehind

    def initialize
    end

    def get_stat
      ret = {}
      ret['write-behind.path'] = '/home/roma/app/wb'
      ret['write-behind.shift_size'] = 10485760
      ret['write-behind.do_write'] = false
      ret
    end

  end # End of class WriteBehind
end # End of module Roma 
