/* =====================================================================================================================
 *  Tutorial Methods
 * ===================================================================================================================== */

function heardoc_tutorial() {
    var heredoc = (function () {/*
 _____     _           _     _    _____       _     
|_   _|_ _| |_ ___ ___|_|___| |  |     |___ _| |___ 
  | | | | |  _| . |  _| | .'| |  | | | | . | . | -_|
  |_| |___|_| |___|_| |_|__,|_|  |_|_|_|___|___|___|
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    return heredoc;
}

function getCommandList() {
    return [
        //GET
        'stats',
        'stats node',
        'nodelist1',
        //POST
        'set foo 0 0 3',
        'bar',
        'get foo',
        'add foo 0 0 3',
        'baz',
        'add hoge 0 0 4',
        'fuga',
        'get hoge',
        'delete foo',
        //DELETE & PUT(release)
        'stat primary|secondary',
        'release',
        'stat primary|secondary',
        'shutdown_self',
        'yes',
        'nodelist',
        //DELETE & PUT(recover)
        'shutdown_self1',
        'yes',
        'nodelist',
        'stat short',
        'recover',
        'stat short',
        //DELETE & PUT(auto recover)
        'set_auto_recover true 600',
        'stat auto',
        //BALSE
        'balse',
        'yes',
        'Finished!!',
    ]
}


function getCommandUsage(cmd) {
    return [
        //GET
        "* stat|stats",
        "* stat|stats <regexp>",
        "* nodelist",
        //POST
        "* set <key> <flag> <exptime> <value size>\\n<value>",
        "* set <key> <flag> <exptime> <value size>\\n<value>",
        "* get <key>",
        "* add <key> <flag> <exptime> <value size>\\n<value>",
        "* add <key> <flag> <exptime> <value size>\\n<value>",
        "* add <key> <flag> <exptime> <value size>\\n<value>",
        "* add <key> <flag> <exptime> <value size>\\n<value>",
        "* add <key> <flag> <exptime> <value size>\\n<value>",
        "* delete <key>",
        //DELETE & PUT(release)
        '* release',
        '* release',
        '* release',
        '* shutdown_self',
        '* shutdown_self',
        '* shutdown_self',
        //DELETE & PUT(recover)
        '* recover',
        '* recover',
        '* recover',
        '* recover',
        '* recover',
        '* recover',
        //DELETE & PUT(set_auto_recover)
        '* set_auto_recover <true|flase> <sec>',
        '* set_auto_recover <true|flase> <sec>',
        //BALSE
        '* balse <reason>',
        '* balse <reason>',
        'Tutorial has finished!!',
    ]
}


function getCommandExplanation() {
    return [
        //GET
        "Firstly Let's check ROMA's cluster status.<br>" +
        "This command will display all of the cluster status.<br>" + 
        "<br>Please input below command and push Enter key.<br>> stats",

        "[stat|stats] command display the all of parameters,<br>" +
        "so it is hard to check specific one.<br>" + 
        "But you can use regular expression as a argument.<br>" + 
        "<br>Please input below command and push Enter key.<br>> stats node",

        "Next let's check current nodelist without using stats.<br>" + 
        "ROMA has the command which check the just alive nodelist.<br>" + 
        "<br>Please input below command and push Enter key.<br>> nodelist",

        //POST
        "Next is a data store command.<br>" +
        "this command store the data.<br>" +
        "<br>Please input below command and push Enter key.<br>> set foo 0 0 3",

        "Next is a data store command.<br>" +
        "this command store the data.<br>" +
        "<br>Please input below command and push Enter key.<br>> set foo 0 0 3<br>" +
        "<br>Please input below command and push Enter key.<br>> bar",

        "Next is a data getting command.<br>" +
        "This command search and display the data.<br>" +
        "<br>Please input below command and push Enter key.<br>> get foo",

        "Next is a data adding command.<br>" +
        "This command is similar to set command,<br>" +
        "but add command set the data unless specified key is already exist.<br>" +
        "Fistly, try add to exist key data.<br>" +
        "<br>Please input below command and push Enter key.<br>> add foo 0 0 3",

        "Next is a data adding command.<br>" +
        "This command is similar to set command,<br>" +
        "but add command set the data unless specified key is already exist.<br>" +
        "Fistly, try add to exist key data.<br>" +
        "<br>Please input below command and push Enter key.<br>> add foo 0 0 3" +
        "<br>Please input below command and push Enter key.<br>> baz",

        "Next is a data adding command.<br>" +
        "This command is similar to set command,<br>" +
        "but add command set the data unless specified key is already exist.<br>" +
        "<br>Next, try add to Non exist data.<br>" +
        "<br>Please input below command and push Enter key.<br>> add hoge 0 0 4",

        "Next is a data adding command.<br>" +
        "This command is similar to set command,<br>" +
        "but add command set the data unless specified key is already exist.<br>" +
        "<br><br>Next, try add to Non exist data.<br>" +
        "<br>Please input below command and push Enter key.<br>> add hoge 0 0 4" + 
        "<br>Please input below command and push Enter key.<br>> fuga",

        "Let's confirm the stored data(of key name is hoge).<br>" +
        "<br>Please input below command and push Enter key.<br>> get hoge",
 
        "Next is a data deletion command.<br>" + 
        "This command remove the data.<br>" +
        "<br>Please input below command and push Enter key.<br>> delete foo",

        //DELETE & PUT(release)
        "Next is a instance shutdown command.<br>" + 
        "Fistly, check the responsible vnodes of this instance.<br>" +
        "<br>Please input below command and push Enter key.<br>> stat primary|secondary",

        "Next step, let's release the these responsible vnodes to other instances.<br>" +
        "<br>Please input below command and push Enter key.<br>> release",

        "release process may take a long time depending on the fail size or something,<br>" +
        "but this is a tutorial, let's skip to end of this process.<br>" +
        "<br>Please input below command and push Enter key.<br>> stat primary|secondary",

        "release process release the all responsible vnodes,<br>" +
        "so let's shutdown the this instance.<br>" +
        "<br>Please input below command and push Enter key.<br>> shutdown_self",

        "release process release the all responsible vnodes,<br>" +
        "so let's shutdown the this instance.<br>" +
        "<br>Please input below command and push Enter key.<br>> shutdown_self"+
        "<br><br>Please input below command and push Enter key.<br>> yes",

        "instance(localhost_10001) was down.<br>" +
        "Let's check node status.<br>" +
        "<br>Please input below command and push Enter key.<br>> nodelist",

        //DELETE & PUT(recover)
        "Next is a recovering redundancy Error command.<br>" + 
        "Fistly, shutdown the instance without execute release.<br>" +
        "<br>Please input below command and push Enter key.<br>> shutdown_self",

        "Next is a recovering redundancy Error command.<br>" + 
        "Fistly, shutdown the instance without execute release.<br>" +
        "<br>Please input below command and push Enter key.<br>> shutdown_self" +
        "<br><br>Please input below command and push Enter key.<br>> yes",

        "instance(localhost_10002) was down.<br>" +
        "Let's check node status.<br>" +
        "<br>Please input below command and push Enter key.<br>> nodelist",

        "We executed shutdown without release responsible vnodes,<br>" +
        "so ROMA's redundancy was down.<br>" +
        "You can check the count of redundancy down vnodes by stats command.<br>" +
        "<br>Please input below command and push Enter key.<br>> stat short",
      
        "It is NOT good for ROMA,<br>" +
        "so let's recover the data by use 'recover' command.<br>" +
        "<br>Please input below command and push Enter key.<br>> recover",

        "recover process may take a long time as also 'release' command,<br>" +
        "so let's skip to end of this process.<br><br>" +
        "After finising recover, short_vnodes will become 0." +
        "<br><br>Please input below command and push Enter key.<br>> stat short",

        //DELETE & PUT(auto recover)
        "We can set to execute recover automatically when redundancy will be down.<br>" +
        "set_auto_reocver can set this.<br>" +
        "<br>Please input below command and push Enter key.<br>> set_auto_recover true 600",

        "This argument means that activating auto recover function passed 600sec after redundancy down.<br>" +
        "Please confirm current status by stats command.<br>" +
        "<br>Please input below command and push Enter key.<br>> stat auto",

        //balse
        "Finally, let's shutdown the ROMA(means shutdown all instaces).<br>" +
        "<br>Please input below command and push Enter key.<br>> balse",

        "Finally, let's shutdown the ROMA(means shutdown all instaces).<br>" +
        "<br>Please input below command and push Enter key.<br>> balse" +
        "<br>Please input below command and push Enter key.<br>> yes",

        "Free mode support more command. <br>Please reload and try Free mode!!",
    ]
}

function getCommandResult() {
    return [
        'Please Push Enter Key',
        //GET
        '.'
        + '<br>.'
        + '<br>.'
        + '<br>connection.handler_instance_count 6'
        + '<br>connection.pool_maxlength 5'
        + '<br>connection.pool_expire_time 30'
        + '<br>connection.EMpool_maxlength 15'
        + '<br>connection.EMpool_expire_time 30'
        + '<br>dns_caching false',

        'stats.run_receive_a_vnode {}'
        + '<br>routing.nodes.length 5'
        + '<br>routing.nodes ["localhost_10001", "localhost_10002", "localhost_10003", "localhost_10004", "localhost_10005"]'
        + '<br>routing.vnodes.length 512'
        + '<br>routing.short_vnodes 0'
        + '<br>routing.lost_vnodes 0'
        + '<br>routing.version_of_nodes {"localhost_10001"=>66048, "localhost_10002"=>66048, "localhost_10003"=>66048, "localhost_10004"=>66048, "localhost_10005"=>66048}',

        'localhost_10001 localhost_10002 localhost_10003 localhost_10004 localhost_10005',

        //POST
        ' ',
        'STORED',

        'VALUE foo 0 3'
        + '<br>bar'
        + '<br>END',

        ' ',
        'NOT_STORED',

        '',
        'STORED',

        'VALUE hoge 0 4 '
        + '<br>fuga'
        + '<br>END',

        'DELETED',

        //DELETE & PUT(release)
        'routing.primary 152'
        + '<br>routing.secondary1 106'
        + '<br>routing.secondary2 133',

        'STARED',

        'routing.primary 0'
        + '<br>routing.secondary1 0'
        + '<br>routing.secondary2 0',

        '================================================================='
        + '<br>CAUTION!!'
        + '<br>        This command kill the instance!'
        + '<br>        There is some possibility of occuring redundancy down!'
        + '<br>================================================================='
        + '<br>Are you sure to shutdown this instance?(yes/no)',

        'BYE'
        + '<br>Connection closed by foreign host.',

        'localhost_10002 localhost_10003 localhost_10004 localhost_10005',

        //DELETE & PUT(recover)
        '================================================================='
        + '<br>CAUTION!!'
        + '<br>        This command kill the instance!'
        + '<br>        There is some possibility of occuring redundancy down!'
        + '<br>================================================================='
        + '<br>Are you sure to shutdown this instance?(yes/no)',

        'BYE'
        + '<br>Connection closed by foreign host.',

        'localhost_10003 localhost_10004 localhost_10005',

        'routing.short_vnodes 391',
       
        '{"localhost_10003"=>"STARTED", "localhost_10004"=>"STARTED", "localhost_10005"=>"STARTED"}',

        'routing.short_vnodes 0',

        //DELETE & PUT(auto recover)
        '{"localhost_10003"=>"STORED", "localhost_10004"=>"STORED", "localhost_10005"=>"STORED"}',

        'routing.auto_recover true'
        + '<br>routing.auto_recover_status waiting'
        + '<br>routing.auto_recover_time 600',

        //balse
        'Are you sure?(yes/no)',
        '{"localhost_10003"=>"BYE", "localhost_10004"=>"BYE", "localhost_10005"=>"BYE"}'
        + '<br>Connection closed by foreign host.',

        '',
    ]
}

function changeSideBarColor(nextCommand) {
    if (nextCommand == 'set foo 0 0 3') {
        $('#side-bar > ul > li:nth-of-type(1)').css({'color':'gray'});
        $('#side-bar > ul > li:nth-of-type(2)').css({'color':'red'});
    } else if (nextCommand == 'stat primary|secondary') {
        $('#side-bar > ul > li:nth-of-type(2)').css({'color':'gray'});
        $('#side-bar > ul > li:nth-of-type(3)').css({'color':'red'});
    } else if (nextCommand == 'recover') {
        $('#side-bar > ul > li:nth-of-type(3)').css({'color':'gray'});
        $('#side-bar > ul > li:nth-of-type(4)').css({'color':'red'});
    } else if (nextCommand == 'balse') {
        $('#side-bar > ul > li:nth-of-type(4)').css({'color':'gray'});
        $('#side-bar > ul > li:nth-of-type(5)').css({'color':'red'});
    }

    if (nextCommand == 'stats') {
        $('#stats').css({'color':'red'});
    } else if (nextCommand == 'nodelist1') {
        $('#stats').css({'color':'gray'});
        $('#nodelist').css({'color':'red'});
    } else if (nextCommand == 'set foo 0 0 3') {
        $('#nodelist').css({'color':'gray'});
        $('#set').css({'color':'red'});
    } else if (nextCommand == 'get foo') {
        $('#set').css({'color':'gray'});
        $('#get').css({'color':'red'});
    } else if (nextCommand == 'add foo 0 0 3') {
        $('#get').css({'color':'gray'});
        $('#add').css({'color':'red'});
    } else if (nextCommand == 'delete foo') {
        $('#add').css({'color':'gray'});
        $('#delete').css({'color':'red'});
    } else if (nextCommand == 'stat primary|secondary') {
        $('#delete').css({'color':'gray'});
        $('#release').css({'color':'red'});
    } else if (nextCommand == 'shutdown_self') {
        $('#release').css({'color':'gray'});
        $('#shutdown_self').css({'color':'red'});
    } else if (nextCommand == 'shutdown_self1') {
        $('#shutdown_self').css({'color':'gray'});
        $('#recover').css({'color':'red'});
    } else if (nextCommand == 'set_auto_recover true 600') {
        $('#recover').css({'color':'gray'});
        $('#set_auto_recover').css({'color':'red'});
    } else if (nextCommand == 'balse') {
        $('#set_auto_recover').css({'color':'gray'});
        $('#balse').css({'color':'red'});
    }
}

function forwardNextCmd() {
    this.state.tutorialCommandResult.shift();

    var nextCmd = this.state.tutorialCommandList.shift();
    this.setState({nextCmd: nextCmd});

    changeSideBarColor(nextCmd);
    nextCmd = removeDigit(nextCmd);

    if (nextCmd) {
        changePlaceHolder.bind(this)(nextCmd);
        this.setState({cmd: this.state.tutorialCommandUsage.shift()});
        this.setState({explain: this.state.tutorialCommandExplanation.shift()});
        this.setState({nextGuidance: ''});

        if (nextCmd == 'Finished!!') {
            $("#inputBox").prop("disabled", true);
        }
    }
}

function removeDigit(str) {
    return str.replace(/1/g,'');
}
