/* =====================================================================================================================
 *  Commmon Methods
 * ===================================================================================================================== */
function heardoc_main() {
    var heredoc = (function () {/*
 _ _ _       _  _                          _    _           _____  _____  __ __    _____  _____  _____  _____ 
| | | | ___ | || | ___  ___  _____  ___   | |_ | |_  ___   |_   _|| __  ||  |  |  | __  ||     ||     ||  _  |
| | | || -_|| || ||  _|| . ||     || -_|  |  _||   || -_|    | |  |    -||_   _|  |    -||  |  || | | ||     |
|_____||___||_||_||___||___||_|_|_||___|  |_|  |_|_||___|    |_|  |__|__|  |_|    |__|__||_____||_|_|_||__|__|
    */}).toString().match(/[^]*\/\*([^]*)\*\/\}$/)[1];

    return heredoc;
}

function showResult(res) {
    var lastcmd = '> '+window.sessionStorage.getItem(['lastcmd'])
    return lastcmd + res;
}

function clearForm(){
    React.findDOMNode(this.refs.command).value = '';
}

function disabledForm() {
    React.findDOMNode(this.refs.command).disabled = 'true';
    React.findDOMNode(this.refs.command).placeholder = 'Please Reload';
}

function changePlaceHolder(str) {
    React.findDOMNode(this.refs.command).placeholder = str;
}


function lines(line){
    if (line) {
        return (<p className='no-margin'>{line}</p>);
    } else {
        return (<p className='no-margin'>&nbsp;</p>);
    }
}

function clearHeader(){
    this.setState({greetingAA: ''})
    this.setState({greetingMessage: ''})
    this.setState({tutorialExplain: ''})
    this.setState({redMsg: ''})
    this.setState({greenMsg: ''})
}
