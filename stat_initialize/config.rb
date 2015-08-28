module Roma
  class Config

    def initialize
    end

    def get_stat
      ret = {}
      ret["config.DEFAULT_LOST_ACTION"] = 'auto_assign'
      ret["config.LOG_SHIFT_AGE"] = 10
      ret["config.LOG_SHIFT_SIZE"] = 10485760
      ret["config.LOG_PATH"] = '/home/roma/app/logs'
      ret["config.RTTABLE_PATH"] = '/home/roma/app/routing'
      ret["config.STORAGE_DELMARK_EXPTIME"] = 432000
      ret["config.STORAGE_EXCEPTION_ACTION"] = 'no_action'
      ret["config.DATACOPY_STREAM_COPY_WAIT_PARAM"] = 0.001
      ret["config.PLUGIN_FILES"] = ["plugin_storage.rb", "plugin_mapcount.rb", "plugin_gui.rb", "plugin_cmd_aliases.rb", "plugin_test.rb", "plugin_map.rb", "plugin_alist.rb", "plugin_debug.rb"]
      ret["config.WRITEBEHIND_PATH"] = '/home/roma/app/wb'
      ret["config.WRITEBEHIND_SHIFT_SIZE"] = 10485760
      ret["config.CONNECTION_DESCRIPTOR_TABLE_SIZE"] = 4096
      ret
    end

  end # End of class Config
end # End of module Roma 
