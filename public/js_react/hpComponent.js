var Head = React.createClass(
    {
        render: function(){
            return(
                <div>
                  <link rel="icon" type="image/vnd.microsoft.icon" href="images/roma-favi.ico" />
                  <meta charset="UTF-8" />
                  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                  <meta name="keywords" content="ROMA, KVS, RakutenRIT, RIT" />
                  <meta name="description" content="ROMA KVS Website. ROMA-Project:A Distributed Key-Value Store in Ruby" />
                  <link rel="stylesheet" type="text/css" href="css/bootstrap.min.css" />
                  <link rel="stylesheet" type="text/css" href="css/bootstrap-theme.min.css" />
                  <link rel="stylesheet" type="text/css" href="css/lightbox.css" />
                  <link rel="stylesheet" type="text/css" href="css/non-responsive.css" />
                  <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css" />
                  <link rel="stylesheet" type="text/css" href="css/roma.min.css" />
                  <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Lato:300,400,700,900,300italic,400italic,700italic,900italic" type="text/css" />
             </div>
            );
        }
    }
);

var TopNavBar = React.createClass(
    {
        render:function(){
            var style = {
                hpHeader: {
                    marginBottom: '75px',
                },
            };
            return (
                <header style={style.hpHeader}>
                  <div className="navbar navbar-default navbar-fixed-top navbar-inverse" role="navigation">
                    <div className="container">
                      <div className="navbar-header">
                        <div className="brand-logo">
                          <a className="navbar-brand" href="/" data-no-turbolink="1">
                            <img src="images/roma_logo.png" alt="roma_logo" height="40px" />
                            <span id="brand-name">ROMA</span><span id="brand-sub-name">-Project</span>
                          </a>
                        </div>

                        <ul className="nav navbar-nav page-list">
                          <li>
                            <a href="./getting_started.html"><i className="fa fa-download"></i> Getting Started</a>
                          </li>
                          <li>
                            <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-pencil"></i> Learn <i className="fa fa-chevron-down"></i></a>
                            <ul className="dropdown-menu" role="menu">
                              <li><a href="./learn/tutorial.html">Tutorial</a></li>
                              <li><a href="./learn/status.html">Status List</a></li>
                              <li><a href="./learn/monitoring_points.html">Monitoring Point</a></li>
                              <li><a href="./learn/trouble_shooting.html">Trouble Shooting</a></li>
                              <li><a href="./learn/faq.html">FAQ</a></li>
                            </ul>
                          </li>
                          <li>
                            <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-file-text-o"></i> Docs <i className="fa fa-chevron-down"></i></a>
                            <ul className="dropdown-menu" role="menu">
                              <li><a href="./docs/about.html">About ROMA</a></li>
                              <li><a href="./docs/versions.html">Versions</a></li>
                              <li><a href="./docs/architectures.html">Architectures</a></li>
                              <li><a href="./docs/configuration.html">Configuration File</a></li>
                              <li><a href="./docs/plugin.html">Plugin</a></li>
                              <li><a href="./docs/storage.html">Storage Architecture</a></li>
                              <li><a href="./docs/developer.html">Developer Manual</a></li>
                              <li className="divider"></li>
                              <li><a href="./docs/phpclient.html">PHP client</a></li>
                              <li><a href="./docs/rubyclient.html">Ruby client</a></li>
                              <li><a href="./docs/javaclient.html">Java client</a></li>
                            </ul>
                          </li>
                          <li>
                            <a href="./commands.html"><i className="fa fa-code"></i> Commands</a>
                          </li>
                          <li>
                            <a href="./gladiator.html"><i className="fa fa-laptop"></i> GUI Tools</a>
                          </li>
                          <li>
                            <a className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-comments-o"></i> Discuss <i className="fa fa-chevron-down"></i></a>
                            <ul className="dropdown-menu" role="menu">
                              <li><a href="./blog.html"><i className="fa fa-pencil"></i> Blog</a></li>
                              <li><a href="https://groups.google.com/forum/#!forum/roma-user" target="_blank"><i className="fa fa-users"></i> Mailing List</a></li>
                              <li><a href="https://github.com/roma/roma/issues" target="_blank"><i className="fa fa-flag-o"></i> Issues</a></li>
                              <li className="divider"></li>
                              <li><a href="https://twitter.com/ROMA_kvs" target="_blank"><i className="fa fa-twitter"></i> Twitter</a></li>
                              <li><a href="https://www.facebook.com/ROMAkvs" target="_blank"><i className="fa fa-facebook-square"></i> Facebook</a></li>
                              <li><a href="https://plus.google.com/communities/118379498916026269736" target="_blank"><i className="fa fa-google-plus"></i> Google+</a></li>
                              <li className="divider"></li>
                              <li><a href="https://github.com/roma/roma" target="_blank"><i className="fa fa-github"></i> Github</a></li>
                              <li><a href="http://www.quora.com/Roma" target="_blank"><i className="fa fa-question"></i> Quora</a></li>
                            </ul>
                          </li>
                          <li>
                            <form className="navbar-form navbar-right search-box" role="search" method="GET" action="https://www.google.com/search">
                              <div className="form-group">
                                <input type="text" name="as_q" className="form-control" placeholder="Search" />
                                <input type="hidden" name="as_sitesearch" value="roma-kvs.org" />
                              </div>
                            </form>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </header>
            );
        }
    }
);

var FooterBar = React.createClass(
    {
        render: function(){
            var style = {
                footer: {
                    position: 'relative',
                    bottom: '0',
                },
            };
            return (
                <footer style={style.footer} className="footer">
                  <div className="container">
                    <div className="col-md-4 col-md-offset-4 text-center">
                      <a href="https://twitter.com/ROMA_kvs" target="_blank"><i className="fa fa-twitter-square fa-3x"></i></a>
                      <a href="https://www.facebook.com/ROMAkvs" target="_blank"><i className="fa fa-facebook-square fa-3x"></i></a>
                      <a href="https://plus.google.com/communities/118379498916026269736" target="_blank"><i className="fa fa-google-plus-square fa-3x"></i></a>
                    </div>
                    <div className="col-md-12">
                        <p className="pull-right backToTop"><a>Back to top</a></p>
                        <p className="text-center">@ 2014 Roma Project / Promoted by Rakuten, Inc. and Rakuten Institute of Technology</p>
                    </div>
                  </div>
                </footer>
            );
        }
    }
);

React.render(<Head />, document.getElementById("hpHead"));
React.render(<TopNavBar />, document.getElementById("hpHeader"));
React.render(<FooterBar />, document.getElementById("hpFooter"));
