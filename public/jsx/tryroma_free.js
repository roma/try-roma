/* =====================================================================================================================
 *  Free Mode Methods
 * ===================================================================================================================== */
function heardoc_free() {
    var heredoc = (function () {/*
 _____                _____ _____ ____  _____ 
|   __|___ ___ ___   |     |     |    \|   __|
|   __|  _| -_| -_|  | | | |  |  |  |  |   __|
|__|  |_| |___|___|  |_|_|_|_____|____/|_____|
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    return heredoc;
}

function changeStyleToHash(json) {
    hash_str = json.replace(/", "/g,'"=>"').replace(/\]\[/g,', ').replace(/\[/,'{').replace(/\]/,'}');
    return hash_str;
}


function refactorStatResult(res) {
    res_lines = '';
    for(var i in res){
        res_lines += ("<br>"+i +" "+ res[i]);
    }
    return res_lines;
}

function makeNodeDownMsg(cmd){

    if (cmd == 'shutdown_self') {
        var nonActiveMessage = this.state.nodeList.shift() + ' was down.<br>So Try ROMA access the next node.'
        var nlist= ''
        for(var i in this.state.nodeList){
            nlist += ("    - "+ this.state.nodeList[i] +"<br>");
        }
        var activeMessage = "Active Nodes are <br>" + nlist
    }

    if ((/^(balse|shutdown)$/.test(cmd)) || (this.state.nodeList.length == 0)) {
        var nonActiveMessage = 'All nodes were down!!<br>Please Reload.'
        var activeMessage = ''
        disabledForm.bind(this)();
    }

    this.setState({downNodeMsg:  nonActiveMessage})
    this.setState({aliveNodeMsg: activeMessage})
}

function checkSecondValue(cmd) {
    var firstCmd = window.sessionStorage.getItem(['lastcmd']); // past command
    var secondCmd = cmd; // confirm command
    window.sessionStorage.setItem(['lastcmd'],[secondCmd]);

    switch (true) {
        case /^(balse|shutdown|shutdown_self)$/.test(firstCmd):
            if (secondCmd) {
                var res = sendAjax.bind(this)('DELETE', { command: firstCmd, confirmation: secondCmd });
            } else {
                var res = sendAjax.bind(this)('DELETE', { command: firstCmd, confirmation: 'nothing' });
            }

            if (secondCmd == 'yes') {
                 makeNodeDownMsg.bind(this)(firstCmd);
            }
            break;

        case /^(set|add|replace|append|prepend)\s([a-z0-9]+)\s0\s([0-9]+)\s([0-9]+)$/.test(firstCmd) :
            var res = sendAjax.bind(this)('POST', { command: RegExp.$1, key: RegExp.$2, exptime: RegExp.$3, bytes: RegExp.$4, value: secondCmd });
            break;

        case /^(cas)\s([a-z0-9]+)\s0\s([0-9]+)\s([0-9]+)\s([0-9]+)$/.test(firstCmd) :
            var res = sendAjax.bind(this)('POST', { command: RegExp.$1, key: RegExp.$2, exptime: RegExp.$3, bytes: RegExp.$4, casid: RegExp.$5, value: secondCmd});
            break;

    }
    
    window.sessionStorage.removeItem(['requireNext']);
    clearForm.bind(this)();

    return res;
}

function sendAjax(action, data, url, format) {
    var path = url || '';
    var response = '';

    $.ajax({
        url: "../"+path,
        type: action,
        data: data,
        dataType: format,
        cache: false,
        async: false,
    }).done(function(res){
        if (action == 'PUT') {
          res = changeStyleToHash(res);
        } 
        if (format == 'json') {
            res = refactorStatResult(res);
        }
        response = '> '+window.sessionStorage.getItem(['lastcmd']) + '<br>' + res + '<br>';
    }.bind(this)).fail(function(){
        response = 'API Request was failed ';
    }.bind(this)).responseText;

    return response;
}

function sendRomaCommand(cmd, tutorialMode) {

    var data = null;
    if (/^(stats|stat|whoami|nodelist|version|get|gets)/.test(cmd)) {
        var action = 'GET';
        if (/^(stats|stat)(\s(.*))*$/.test(cmd)) {
            var url = RegExp.$1+"/"+RegExp.$3;
            var dataType = 'json';

        } else if (/^(whoami|nodelist|version)$/.test(cmd)) {
            var url = RegExp.$1;

        } else if (/^(get|gets)\s(.+)$/.test(cmd)) { 
            var url = RegExp.$1+"/"+RegExp.$2;
        } else {
            var res = showResult.bind(this)('<br>Argument Error<br>');
            action = null;
        }
    } else if (/^(release|recover|set_lost_action|set_auto_recover|set_log_level)/.test(cmd)) {
        var action = 'PUT';
        if (/^(release|recover)$/.test(cmd)) {
            data = {command: RegExp.$1};
        } else if (/^(set_lost_action)\s(.+)$/.test(cmd)) {
            data = {command: RegExp.$1, level: RegExp.$2, lost: RegExp.$2};
        } else if (/^(set_auto_recover)\s([a-z]+)\s*([0-9]*)$/.test(cmd)) {
            data = {command: RegExp.$1, bool: RegExp.$2, sec: RegExp.$3};
        } else if (/^(set_log_level)\s([a-z]+)$/.test(cmd)) {
            data = {command: RegExp.$1, level: RegExp.$2};
        } else {
            var res = showResult.bind(this)('<br>Argument Error<br>');
            action = null;
        }
    } else if (/^(set|add|replace|append|prepend|cas|set_expt|incr|decr|delete)/.test(cmd)) {
        if (/^(set|add|replace|append|prepend)\s([a-z0-9]+)\s0\s([0-9]+)\s([0-9]+)$/.test(cmd)) {
            window.sessionStorage.setItem(['requireNext'],[true]);
            changePlaceHolder.bind(this)('please input value');
            var res = showResult.bind(this)('');

        } else if (/^(cas)\s([a-z0-9]+)\s0\s([0-9]+)\s([0-9]+)\s([0-9]+)$/.test(cmd)) {
            window.sessionStorage.setItem(['requireNext'],[true]);
            changePlaceHolder.bind(this)('please input value');
            var res = showResult.bind(this)('');

        } else if (/^(set_expt)\s([a-z0-9]+)\s([0-9]+)$/.test(cmd)) {
            var action = 'POST';
            data = { command: RegExp.$1, key: RegExp.$2, exptime: RegExp.$3 };

        } else if (/^(incr|decr)\s([a-z0-9]+)\s([-]*[0-9]+)$/.test(cmd)) {
            var action = 'POST';
            data = { command: RegExp.$1, key: RegExp.$2, digit: RegExp.$3 };

        } else if (/^(delete)\s([a-z0-9]+)$/.test(cmd)) {
            var action = 'POST';
            data = { command: RegExp.$1, key: RegExp.$2 };
        } else {
            var res = showResult.bind(this)('<br>Argument Error<br>');
            action = null;
        }
    } else if (/^(balse|shutdown|shutdown_self)$/.test(cmd)) {
        var action = 'DELETE';
        var firstCmd = RegExp.$1;
        data = { command: firstCmd, confirmation: null };
        
        if (/^(balse|shutdown|shutdown_self)$/.test(firstCmd)) {
            window.sessionStorage.setItem(['requireNext'],[true]);
        }
    } else if (/^(rbalse)$/.test(cmd)) {
          var res = showResult.bind(this)('<br>rbalse is deprecated command, please use [shutdown_self] command<br>');
    } else if (/^()$/.test(cmd)) {
          var res = '> ';
    } else {
          var res = showResult.bind(this)('<br>Not Supported<br>');
    }

    if (action) {
        var res = sendAjax.bind(this)(action, data, url, dataType);
    }

    clearForm.bind(this)();
    return res;

}

function sendPureCommand(cmd) {
    this.setState({downNodeMsg: ''})
    this.setState({aliveNodeMsg: ''})

    if (window.sessionStorage.getItem(['requireNext'])) {
        var res = checkSecondValue.bind(this)(cmd);
        React.findDOMNode(this.refs.command).placeholder = 'please input command';
        return res;
    } else if (cmd == '!!') {
        var res = sendRomaCommand.bind(this)(window.sessionStorage.getItem(['lastcmd']));
        return res;
    } else {
        window.sessionStorage.setItem(['lastcmd'],[cmd]);

        var res = sendRomaCommand.bind(this)(cmd);
        return res;
    }
}
