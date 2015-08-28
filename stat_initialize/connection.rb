module Roma
  class Connection

    # GET
    attr_accessor :count

    def initialize
      @count = 10
    end

    def get_stat
      ret = {}
      ret["connection.count"] = @count
      ret["connection.descriptor_table_size"] = 4096
      ret["connection.continuous_limit"] = '200:30:300'
      ret["connection.accepted_connection_expire_time"] = 0
      ret["connection.handler_instance_count"] = 6
      ret["connection.pool_maxlength"] = 5
      ret["connection.pool_expire_time"] = 30
      ret["connection.EMpool_maxlength"] = 15
      ret["connection.EMpool_expire_time"] = 30
      ret
    end

  end # End of class Connection
end # End of module Roma 
