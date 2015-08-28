#class Roma
module Roma
  class FinishCommand
    attr_accessor :list

    def initialize()
      @list = Hash.new
      @list = {
        "balse" => "Are you sure?(yes/no)",
        "shutdown" => "*** ARE YOU REALLY SURE TO SHUTDOWN? *** (yes/no)",
        "shutdown_self" =>
          <<-'Confirmation'
=================================================================
CAUTION!!
        This command kill the instance!
        There is some possibility of occuring redundancy down!
=================================================================
Are you sure to shutdown this instance?(yes/no)
          Confirmation
      }
    end
  end # End of Stat
end # End of Roma
