/* =====================================================================================================================
 *  React Component
 * ===================================================================================================================== */
var Title = React.createClass(
    {displayName: "Title",
        componentWillMount() {
            window.sessionStorage.removeItem(['requireNext']);
            window.sessionStorage.removeItem(['lastcmd']);
        },
        render: function() {
            var style = {
                title: {
                    fontFamily: 'courier',
                    fontSize: '60px',
                    fontWeight: 'bold',
                    color: 'red',
                },
                center: {
                    position: 'relative',
                },
                logo: {
                     width: '60px',
                     position: 'absolute',
                     //top: '5px',
                     top: '10px',
                },
            };
            return (
                React.createElement("div", {style: style.title}, 
                  React.createElement("center", {style: style.center}, 
                    "Try R", React.createElement("img", {src: "../img/ROMA.png", id: "title-image", style: style.logo}), " MA"
                  )
                )
            );
        }
    }
);

var SelectModeButton = React.createClass(
    {displayName: "SelectModeButton",
        getInitialState() {
            return{
                mode: null,
            };
        },
        selectMode(e) {
            if (e.target.name == 'tutorial') {
                $('#console-screen').animate({'margin-left':'220px', 'margin-right':'20px'}, 500);
                $('.side-bar').css({'visibility':'visible'});
                $('.side-bar > ul > li:nth-of-type(1)').css({'color':'red'});

                $("#tutorial-button").prop("disabled", true);
                $("#free-button").hide('slow', function(){$("#free-button").remove();});
                this.setState({mode: 'tutorial'});

            } else if (e.target.name == 'free') {
                $("#free-button").prop("disabled", true);
                $("#tutorial-button").hide('slow', function(){$("#tutorial-button").remove();});
                this.setState({mode: 'free'});
            }
        },
        render: function() {
            return (
                React.createElement("div", null, 
                  React.createElement("div", {id: "mode-button"}, 
                    React.createElement("center", null, 
                      React.createElement("button", {id: "tutorial-button", type: "button", name: "tutorial", onClick: this.selectMode}, 
                        "Tutorial mode"
                      ), 
                      React.createElement("button", {id: "free-button", type: "button", name: "free", onClick: this.selectMode}, 
                        "Free mode"
                      )
                    )
                  ), 

                  React.createElement(Main, {mode: this.state.mode})

                )
            );
        }
    }
);

var Main = React.createClass(
    {displayName: "Main",
        render: function() {
            return (
                React.createElement("div", null, 
                  React.createElement(TutorialSideBar, {mode: this.props.mode}), 

                  React.createElement(Input, {mode: this.props.mode})
                )
            );
        }
    }
);

var TutorialSideBar = React.createClass(
    {displayName: "TutorialSideBar",
        render: function() {
            return (
                React.createElement("span", {className: "side-bar"}, 
                  React.createElement("ul", null, 
                    React.createElement("li", null, "Check Status"), 
                    React.createElement("ul", {className: "tutorial-commands"}, 
                      React.createElement("li", {id: "stats"}, "stat"), 
                      React.createElement("li", {id: "nodelist"}, "nodelist")
                    ), 
                    React.createElement("li", null, "Manage Data"), 
                    React.createElement("ul", {className: "tutorial-commands"}, 
                      React.createElement("li", {id: "set"}, "set"), 
                      React.createElement("li", {id: "get"}, "get"), 
                      React.createElement("li", {id: "add"}, "add"), 
                      React.createElement("li", {id: "delete"}, "delete")
                    ), 
                    React.createElement("li", null, "Instance shutdown"), 
                    React.createElement("ul", {className: "tutorial-commands"}, 
                      React.createElement("li", {id: "release"}, "release"), 
                      React.createElement("li", {id: "shutdown_self"}, "shutdown_self")
                    ), 
                    React.createElement("li", null, "Recover redundancy"), 
                    React.createElement("ul", {className: "tutorial-commands"}, 
                      React.createElement("li", {id: "recover"}, "recover"), 
                      React.createElement("li", {id: "set_auto_recover"}, "set_auto_recover")
                    ), 
                    React.createElement("li", null, "STOP ROMA"), 
                    React.createElement("ul", {className: "tutorial-commands"}, 
                      React.createElement("li", {id: "balse"}, "balse")
                    )
                  )
                )
            );
        }
    }
);

var Input = React.createClass(
    {displayName: "Input",
        getDefaultProps() {
            return {
                ENTER: 13,
                placeholder: 'please select mode',
            };
        },
        getInitialState() {
            return {
                res: "",
                downNodeMsg: "",
                aliveNodeMsg: "",
                nodeList: ['localhost_10001', 'localhost_10002', 'localhost_10003', 'localhost_10004', 'localhost_10005'],
                tutorialCommandList: getCommandList(),
                tutorialCommandUsage: getCommandUsage(),
                tutorialCommandExplanation: getCommandExplanation(),
                tutorialCommandResult: getCommandResult(),
                placeholder: this.props.placeholder,
                explain: '',
                nextCmd: '',
            };
        },
        componentDidMount() {
            $("#inputBox").prop("disabled", true);
        },
        componentWillReceiveProps(nextProps) {
            this.setState({placeholder: 'Please input command'});
            $("#inputBox").prop("disabled", false);
            this.refs.command.getDOMNode().focus();
        },
        sendCommand(e) {
            if(e.keyCode == this.props.ENTER){
                // Free mode
                if (this.props.mode == 'free') {
                    var response = sendPureCommand.bind(this)(e.target.value);
                    this.setState({res: response});

                // Tutorial Mode
                } else if (this.props.mode == 'tutorial') {
                    window.sessionStorage.setItem(['lastcmd'],[e.target.value]);

                    // forward to next command
                    if (e.target.value == '') {
                        forwardNextCmd.bind(this)();
                        this.setState({res: ''}); 
                    } else {
                        var correctCmd = this.state.nextCmd;
                        var correctCmd = removeDigit(correctCmd)
                        // correct command
                        if (e.target.value == correctCmd) {

                            response = '> '+ e.target.value+'<br><br>';
                            response += this.state.tutorialCommandResult[0];
                            this.setState({res: response});
                            if (/^(set|add|shutdown_self|balse)/.test(correctCmd)) {
                                forwardNextCmd.bind(this)();

                            } else {
                                //this.setState({res: response});
                                nextGuidance = "<br>Good!! Let's go Next Command, please push Enter."
                                changePlaceHolder.bind(this)('Please Push Enter to go Next Command.');
                                this.setState({nextGuidance: nextGuidance});
                            }

                        // incorrect command
                        } else {
                            var retryRes = showResult.bind(this)('<br>please input [' + correctCmd + '] command<br>');
                            this.setState({res: retryRes});
                            this.setState({nextGuidance: ''});
                        }
                        clearForm.bind(this)();
                    }
                } 
            } 
        },
        render: function() {
            var nodeMsg = {
                nonActive: this.state.downNodeMsg,
                active: this.state.aliveNodeMsg,
            };

            var whichModeHeader;
            if (this.props.mode == 'free') {
                whichModeHeader = React.createElement(FreeHeader, {nodeMsg: nodeMsg});
            } else if (this.props.mode == 'tutorial') {
                whichModeHeader = React.createElement(TutorialHeader, {cmd: this.state.cmd, explain: this.state.explain});
            } else if (this.props.mode == null) {
                whichModeHeader = React.createElement(FirstHeader, null);
            }

            var whichModeDisplay;
            if (this.props.mode == 'free') {
                whichModeDisplay = React.createElement(FreeResult, {response: this.state.res});
            } else if (this.props.mode == 'tutorial') {
                whichModeDisplay = React.createElement(TutorialResult, {response: this.state.res, nextGuidance: this.state.nextGuidance});
            }

            var style = {
                gt: {
                    fontFamily: 'courier',
                    fontSize: '20px',
                },
            };
            return (
              React.createElement("div", {id: "console-screen"}, 

                whichModeHeader, 
                whichModeDisplay, 

                React.createElement("div", {id: "inputArea"}, 
                  React.createElement("p", {className: "no-margin"}, React.createElement("span", {style: style.gt}, ">"), " ", React.createElement("input", {id: "inputBox", type: "text", placeholder: this.state.placeholder, onChange: this.changeText, onKeyDown: this.sendCommand, ref: "command"}))
                )
              )
            );
        }
    }
);

var FirstHeader = React.createClass(
    {displayName: "FirstHeader",
        getDefaultProps() {
            return {
                greetingAA: heardoc_main(),
                greetingMessage: 'Please select mode!',
            };
        },
        render: function() {
            var style = {
                greeting: {
                    color: '#00cede',
                },
                greetingAA: {
                    fontSize: '12px',
                    fontFamily: 'courier'
                },
                greetingMsg: {
                    fontSize: '26px',
                },
            };
            return (
                React.createElement("div", {style: style.greeting}, 
                  React.createElement("div", {style: style.greetingAA}, this.props.greetingAA), 
                  React.createElement("div", {style: style.greetingMsg}, this.props.greetingMessage)
                )
            );
        }
    }
);


var FreeHeader = React.createClass(
    {displayName: "FreeHeader",
        getDefaultProps() {
            return {
                greetingAA: heardoc_free(),
                greetingMessage: 'Please feel free to execute ROMA command!!',
            };
        },
        getInitialState() {
            return {
                greetingAA: this.props.greetingAA,
                greetingMessage: this.props.greetingMessage,
                redMsg: '',
                greenMsg: '',
            };
        },
        componentWillReceiveProps(nextProps) {
            clearHeader.bind(this)();
            this.setState({redMsg: nextProps.nodeMsg['nonActive']});
            this.setState({greenMsg: nextProps.nodeMsg['active']});
        },
        render: function() {
            var style = {
                greeting: {
                    color: '#00cede',
                },
                greetingAA: {
                    fontSize: '20px',
                    fontFamily: 'courier'
                },
                greetingMsg: {
                    fontSize: '26px',
                },
                nonActive: {
                    color: 'red',
                    fontSize: '33px',
                },
                active: {
                    color: 'lime',
                    fontSize: '20px',
                },
            };
            return (
                React.createElement("div", null, 
                  React.createElement("div", {style: style.greeting}, 
                    React.createElement("div", {style: style.greetingAA}, this.state.greetingAA), 
                    React.createElement("div", {style: style.greetingMsg}, this.state.greetingMessage)
                  ), 
                  React.createElement("div", null, 
                    React.createElement("div", {style: style.nonActive}, this.state.redMsg.split('<br>').map(lines)), 
                    React.createElement("div", {style: style.active}, this.state.greenMsg.split('<br>').map(lines))
                  )
                )
            );
        }
    }
);

var TutorialHeader = React.createClass(
    {displayName: "TutorialHeader",
        getInitialState() {
            return {
                greetingAA: heardoc_tutorial(),
                greetingMessage: "This mode is tutorial of ROMA basic usage.<br>This mode explain ROMA command one by one.<br><br>Let's start tutorial!!<br>Please push Enter Key ",
                cmd: '',
                explain: '',
            };
        },
        componentWillReceiveProps(nextProps) {
            clearHeader.bind(this)();
            this.setState({explain: nextProps.explain});
            this.setState({cmd: nextProps.cmd});
        },
        render: function() {
            var style = {
                headerArea: {
                    wordWrap: 'break-word',
                },
                greeting: {
                    color: '#00cede',
                },
                greetingAA: {
                    fontSize: '20px',
                    fontFamily: 'courier',
                },
                greetingMsg: {
                    fontSize: '25px',
                },
                explain: {
                    color: 'lime',
                },
                tutorialCmd: {
                    fontSize: '28px',
                    textDecoration: 'underline',
                },
                tutorialMsg: {
                    fontSize: '25px',
                    marginLeft: '25px',
                },
            };
            return (
                React.createElement("div", {style: style.headerArea}, 
                  React.createElement("div", {style: style.greeting}, 
                    React.createElement("div", {style: style.greetingAA}, this.state.greetingAA), 
                    React.createElement("div", {style: style.greetingMsg}, this.state.greetingMessage.split('<br>').map(lines))
                  ), 
                  React.createElement("div", {style: style.explain}, 
                    React.createElement("div", {style: style.tutorialCmd}, this.state.cmd), 
                    React.createElement("div", {style: style.tutorialMsg}, this.state.explain.split('<br>').map(lines))
                  )
                )
            );
        }
    }
);

var FreeResult = React.createClass(
    {displayName: "FreeResult",
        getInitialState() {
            return {
                response: '',
            };
        },
        componentWillReceiveProps(nextProps) {
            if (nextProps.response.lastIndexOf('BYE') == -1) {
                this.setState({response: this.state.response + '<br>' + nextProps.response});
            } else {
                this.setState({response: nextProps.response});
            }
        },
        render: function() {
            return (
                React.createElement("div", {id: "responseArea"}, 
                  this.state.response.split('<br>').map(lines)
                )
            );
        }
    }
);

var TutorialResult = React.createClass(
    {displayName: "TutorialResult",
        getDefaultProps() {
            return {
                nextGuidance: '',
            }
        },
        getInitialState() {
            return {
                response: '',
            };
        },
        render: function() {
            var style = {
                next: {
                    color: 'lime',
                },
            };
            return (
                React.createElement("div", {id: "responseArea"}, 
                  this.props.response.split('<br>').map(lines), 
                  React.createElement("div", {style: style.next}, this.props.nextGuidance.split('<br>').map(lines))
                )
            );
        }
    }
);

var FooterInfo = React.createClass(
    {displayName: "FooterInfo",
        render: function() {
            var style = {
                endMessage: {
                    marginBottom: '25px',
                },
            };
            return (
                React.createElement("div", {style: style.endMessage}, 
                  React.createElement("center", null, 
                    React.createElement("p", {className: "no-margin"}, "This site was inspired by Try Redis."), 
                    React.createElement("p", {className: "no-margin"}, "The source code to Try ROMA is available on ", React.createElement("a", {href: "https://github.com/roma/try-roma"}, "GitHub"), ".")
                  )
                )
            );
        }
    }
);


// root component
var TryRoma = React.createClass(
    {displayName: "TryRoma",
        render: function() {
            return (
                React.createElement("div", null, 
                  React.createElement(Title, null), 
                  React.createElement(SelectModeButton, null), 
                  React.createElement(FooterInfo, null)
                )
            );
        }
    }
);

React.render(React.createElement(TryRoma, null), document.getElementById("reactArea"));

