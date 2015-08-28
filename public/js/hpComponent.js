var Head = React.createClass(
    {displayName: "Head",
        render: function(){
            return(
                React.createElement("div", null, 
                  React.createElement("link", {rel: "icon", type: "image/vnd.microsoft.icon", href: "images/roma-favi.ico"}), 
                  React.createElement("meta", {charset: "UTF-8"}), 
                  React.createElement("meta", {"http-equiv": "X-UA-Compatible", content: "IE=edge"}), 
                  React.createElement("meta", {name: "keywords", content: "ROMA, KVS, RakutenRIT, RIT"}), 
                  React.createElement("meta", {name: "description", content: "ROMA KVS Website. ROMA-Project:A Distributed Key-Value Store in Ruby"}), 
                  React.createElement("link", {rel: "stylesheet", type: "text/css", href: "css/bootstrap.min.css"}), 
                  React.createElement("link", {rel: "stylesheet", type: "text/css", href: "css/bootstrap-theme.min.css"}), 
                  React.createElement("link", {rel: "stylesheet", type: "text/css", href: "css/lightbox.css"}), 
                  React.createElement("link", {rel: "stylesheet", type: "text/css", href: "css/non-responsive.css"}), 
                  React.createElement("link", {rel: "stylesheet", type: "text/css", href: "css/font-awesome.min.css"}), 
                  React.createElement("link", {rel: "stylesheet", type: "text/css", href: "css/roma.min.css"}), 
                  React.createElement("link", {rel: "stylesheet", href: "http://fonts.googleapis.com/css?family=Lato:300,400,700,900,300italic,400italic,700italic,900italic", type: "text/css"})
             )
            );
        }
    }
);

var TopNavBar = React.createClass(
    {displayName: "TopNavBar",
        render:function(){
            var style = {
                hpHeader: {
                    marginBottom: '75px',
                },
            };
            return (
                React.createElement("header", {style: style.hpHeader}, 
                  React.createElement("div", {className: "navbar navbar-default navbar-fixed-top navbar-inverse", role: "navigation"}, 
                    React.createElement("div", {className: "container"}, 
                      React.createElement("div", {className: "navbar-header"}, 
                        React.createElement("div", {className: "brand-logo"}, 
                          React.createElement("a", {className: "navbar-brand", href: "/", "data-no-turbolink": "1"}, 
                            React.createElement("img", {src: "images/roma_logo.png", alt: "roma_logo", height: "40px"}), 
                            React.createElement("span", {id: "brand-name"}, "ROMA"), React.createElement("span", {id: "brand-sub-name"}, "-Project")
                          )
                        ), 

                        React.createElement("ul", {className: "nav navbar-nav page-list"}, 
                          React.createElement("li", null, 
                            React.createElement("a", {href: "./getting_started.html"}, React.createElement("i", {className: "fa fa-download"}), " Getting Started")
                          ), 
                          React.createElement("li", null, 
                            React.createElement("a", {className: "dropdown-toggle", "data-toggle": "dropdown"}, React.createElement("i", {className: "fa fa-pencil"}), " Learn ", React.createElement("i", {className: "fa fa-chevron-down"})), 
                            React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                              React.createElement("li", null, React.createElement("a", {href: "./learn/tutorial.html"}, "Tutorial")), 
                              React.createElement("li", null, React.createElement("a", {href: "./learn/status.html"}, "Status List")), 
                              React.createElement("li", null, React.createElement("a", {href: "./learn/monitoring_points.html"}, "Monitoring Point")), 
                              React.createElement("li", null, React.createElement("a", {href: "./learn/trouble_shooting.html"}, "Trouble Shooting")), 
                              React.createElement("li", null, React.createElement("a", {href: "./learn/faq.html"}, "FAQ"))
                            )
                          ), 
                          React.createElement("li", null, 
                            React.createElement("a", {className: "dropdown-toggle", "data-toggle": "dropdown"}, React.createElement("i", {className: "fa fa-file-text-o"}), " Docs ", React.createElement("i", {className: "fa fa-chevron-down"})), 
                            React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/about.html"}, "About ROMA")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/versions.html"}, "Versions")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/architectures.html"}, "Architectures")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/configuration.html"}, "Configuration File")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/plugin.html"}, "Plugin")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/storage.html"}, "Storage Architecture")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/developer.html"}, "Developer Manual")), 
                              React.createElement("li", {className: "divider"}), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/phpclient.html"}, "PHP client")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/rubyclient.html"}, "Ruby client")), 
                              React.createElement("li", null, React.createElement("a", {href: "./docs/javaclient.html"}, "Java client"))
                            )
                          ), 
                          React.createElement("li", null, 
                            React.createElement("a", {href: "./commands.html"}, React.createElement("i", {className: "fa fa-code"}), " Commands")
                          ), 
                          React.createElement("li", null, 
                            React.createElement("a", {href: "./gladiator.html"}, React.createElement("i", {className: "fa fa-laptop"}), " GUI Tools")
                          ), 
                          React.createElement("li", null, 
                            React.createElement("a", {className: "dropdown-toggle", "data-toggle": "dropdown"}, React.createElement("i", {className: "fa fa-comments-o"}), " Discuss ", React.createElement("i", {className: "fa fa-chevron-down"})), 
                            React.createElement("ul", {className: "dropdown-menu", role: "menu"}, 
                              React.createElement("li", null, React.createElement("a", {href: "./blog.html"}, React.createElement("i", {className: "fa fa-pencil"}), " Blog")), 
                              React.createElement("li", null, React.createElement("a", {href: "https://groups.google.com/forum/#!forum/roma-user", target: "_blank"}, React.createElement("i", {className: "fa fa-users"}), " Mailing List")), 
                              React.createElement("li", null, React.createElement("a", {href: "https://github.com/roma/roma/issues", target: "_blank"}, React.createElement("i", {className: "fa fa-flag-o"}), " Issues")), 
                              React.createElement("li", {className: "divider"}), 
                              React.createElement("li", null, React.createElement("a", {href: "https://twitter.com/ROMA_kvs", target: "_blank"}, React.createElement("i", {className: "fa fa-twitter"}), " Twitter")), 
                              React.createElement("li", null, React.createElement("a", {href: "https://www.facebook.com/ROMAkvs", target: "_blank"}, React.createElement("i", {className: "fa fa-facebook-square"}), " Facebook")), 
                              React.createElement("li", null, React.createElement("a", {href: "https://plus.google.com/communities/118379498916026269736", target: "_blank"}, React.createElement("i", {className: "fa fa-google-plus"}), " Google+")), 
                              React.createElement("li", {className: "divider"}), 
                              React.createElement("li", null, React.createElement("a", {href: "https://github.com/roma/roma", target: "_blank"}, React.createElement("i", {className: "fa fa-github"}), " Github")), 
                              React.createElement("li", null, React.createElement("a", {href: "http://www.quora.com/Roma", target: "_blank"}, React.createElement("i", {className: "fa fa-question"}), " Quora"))
                            )
                          ), 
                          React.createElement("li", null, 
                            React.createElement("form", {className: "navbar-form navbar-right search-box", role: "search", method: "GET", action: "https://www.google.com/search"}, 
                              React.createElement("div", {className: "form-group"}, 
                                React.createElement("input", {type: "text", name: "as_q", className: "form-control", placeholder: "Search"}), 
                                React.createElement("input", {type: "hidden", name: "as_sitesearch", value: "roma-kvs.org"})
                              )
                            )
                          )
                        )
                      )
                    )
                  )
                )
            );
        }
    }
);

var FooterBar = React.createClass(
    {displayName: "FooterBar",
        render: function(){
            var style = {
                footer: {
                    position: 'relative',
                    bottom: '0',
                },
            };
            return (
                React.createElement("footer", {style: style.footer, className: "footer"}, 
                  React.createElement("div", {className: "container"}, 
                    React.createElement("div", {className: "col-md-4 col-md-offset-4 text-center"}, 
                      React.createElement("a", {href: "https://twitter.com/ROMA_kvs", target: "_blank"}, React.createElement("i", {className: "fa fa-twitter-square fa-3x"})), 
                      React.createElement("a", {href: "https://www.facebook.com/ROMAkvs", target: "_blank"}, React.createElement("i", {className: "fa fa-facebook-square fa-3x"})), 
                      React.createElement("a", {href: "https://plus.google.com/communities/118379498916026269736", target: "_blank"}, React.createElement("i", {className: "fa fa-google-plus-square fa-3x"}))
                    ), 
                    React.createElement("div", {className: "col-md-12"}, 
                        React.createElement("p", {className: "pull-right backToTop"}, React.createElement("a", null, "Back to top")), 
                        React.createElement("p", {className: "text-center"}, "@ 2014 Roma Project / Promoted by Rakuten, Inc. and Rakuten Institute of Technology")
                    )
                  )
                )
            );
        }
    }
);

React.render(React.createElement(Head, null), document.getElementById("hpHead"));
React.render(React.createElement(TopNavBar, null), document.getElementById("hpHeader"));
React.render(React.createElement(FooterBar, null), document.getElementById("hpFooter"));
