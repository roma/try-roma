module Roma
  class WriteBehind

    def initialize
    end

    def get_stat
      ret = {}
      ret['write-behind.path'] = '/home/roma/app/wb'
      ret['write-behind.shift_size'] = 10485760
      ret['write-behind.do_write'] = false
      ret['write-behind.run_replication'] = true
      ret['write-behind.run_existing_data_replication'] = false
      ret['write-behind.replica_mklhash'] = 'b645bba848c7013ec7357963a1b37d4369c11b37'
      ret['write-behind.replica_nodelist'] = ["replica_20001", "replica_20002","replica_20003","replica_20004","replica_20005"]
      ret
    end

  end # End of class WriteBehind
end # End of module Roma 
