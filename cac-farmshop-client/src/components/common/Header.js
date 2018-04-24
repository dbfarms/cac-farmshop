import React, {PropTypes} from 'react';  
import { Link, NavLink } from 'react-router-dom';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as sessionActions from '../../actions/sessionActions';
import '../../index.css';
import MediaQuery from 'react-responsive';
import Submenu from '../../components/common/Submenu';
import SideMenu from '../../components/common/sideMenu';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; 
import ShareButton from 'react-social-share-buttons';

class Header extends React.Component {  
  constructor(props) {
    super();

    this.state = {
      showAboutMenu: false,
      showFarmerMenu: false
    };

    this.logOut = this.logOut.bind(this);
  }

  handleHover = (event) => {
    //debugger 
    this.setState({ showAboutMenu: true });
  };
  
  handleLeave = (event) => {
    this.setState({ showAboutMenu: false });
  };

  handleFarmersHover = (event) => {
    this.setState({ showFarmerMenu: true });
  };
  
  handleFarmersLeave = (event) => {
    this.setState({ showFarmerMenu: false });
  };

  logOut(event) {
    event.preventDefault();
    alert('you are logged out')
    //one day i'd like the redirect to work?
    this.props.actions.logOutUser();
  }

  makeRoutes(routes){
    //debugger
    const routesLinks = [] 
    const routesLength = (Object.keys(this.props.roleRoutes).length - 1)
    //debugger 
    Object.entries(this.props.roleRoutes).map(function(keyName, keyIndex) {
      routesLinks.push(keyName)
    })
    //debugger 
    return (
      <nav className="nav">
        <ul className="nav__menu header-nav">
          {routesLinks.map((route, keyIndex) => { 
            //debugger 
            //onMouseEnter={this.handleHover}
            //onMouseLeave={this.handleLeave}
            return (
                <span key={keyIndex}>
                  {keyIndex === routesLength &&
                    <span>
                      {this.menuSelector(route)}
                      <li className="nav__menu-item left-menu">
                      <a className="menu-item-text" 
                         href="/" onClick={this.logOut}>log out</a>
                      </li>
                      <li className="nav__menu-item">
                        {this.miniWidgets()}
                      </li>
                    </span>
                  }
                  {keyIndex !== (routesLinks.length-1) &&
                  <span>
                    {this.menuSelector(route)}
                  </span>
                  }
                </span>
              )
            })
          }
        </ul>
      </nav>
    ) 
  }

  aStyle = {
    visibility: "visible"
  };

  menuSelector = (route) => {
    //debugger 
    switch(route[1]){
      case 'home':
        return (
          <li className="nav__menu-item left-menu"
            onMouseLeave={this.handleLeave}>
            <NavLink to={`/${route[1]}`} 
              className="menu-item-text"
              onMouseEnter={this.handleHover}> {route[0]} 
            </NavLink>
            <div className="submenu-container">
              <ReactCSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                { this.state.showAboutMenu && 
                  <Submenu selector="home"/> 
                }
              </ReactCSSTransitionGroup>
            </div>
            {console.log(route[1])}
          </li>
        )
      case 'farmers':
        return (
          <li className="nav__menu-item left-menu"
              onMouseLeave={this.handleFarmersLeave}>
            <NavLink to={`/${route[1]}`} 
              className="menu-item-text"
              onMouseEnter={this.handleFarmersHover}> {route[0]} 
            </NavLink>
            <div className="submenu-container">
              <ReactCSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                {this.state.showFarmerMenu && 
                  <Submenu selector="farmers"/> 
                }
              </ReactCSSTransitionGroup>
            </div>
          </li>
        )
      default: 
        return (
          <li className="nav__menu-item left-menu">
            <NavLink to={`/${route[1]}`} 
              className="menu-item-text"> {route[0]} 
            </NavLink>
          </li>
        )
    }
  }

  miniWidgets = () => {
    return (
      <div className="">
                  <span className="widget">
                  <ShareButton 
                    compact
                    socialMedia={'facebook'}
                    url="https://www.facebook.com/Chesteragriculturalcenter-266309927207713/"
                  />
                  </span>
                  <span className="widget">
                  <ShareButton 
                    compact
                    socialMedia={'twitter'}
                    url="https://twitter.com/ChesterAgCenter"
                  />
                  </span>
                  <span className="widget">
                  <ShareButton 
                    compact
                    socialMedia={'google-plus'}
                    url="https://business.google.com/b/111195640342033814688/dashboard/l/04359502499373104089?hl=en"
                  />
                  </span>
                </div>
    )
  }

  render() {
    //debugger 
    const routes = this.makeRoutes() 
    //debugger 
    return (
      <header>
        <div className="top-bar full-width-line header-bottom" role="banner">
        <div className="top-bar full-width-line"></div>
          <div className="branding">
              <MediaQuery query="(min-width: 1065px)" >
                <div className="test-container">
                <div className="cac-logo-here" align="middle">
                    <a href="http://www.chesteragcenter.com" align="middle"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="220" height="204" align="middle"/></a>
                </div>
                {sessionStorage.jwt !== "undefined" &&
                  <div>
                    <nav className="nav">
                      {routes}
                    </nav>
                  </div>
                }
                {sessionStorage.jwt === "undefined" && 
                //menu-item menu-item-type-post_type menu-item-object-post menu-item-has-children menu-item-15136 has-children
                <nav className="nav">
                  <ul className="nav__menu header-nav">
                    <li className="nav__menu-item"
                        onMouseLeave={this.handleLeave}
                    >
                      <NavLink to="/" 
                        className="menu-item-text"
                        onMouseEnter={this.handleHover}
                        >Home
                      </NavLink>
                      <div className="submenu-container">
                        <ReactCSSTransitionGroup
                          transitionName="slide"
                          transitionEnterTimeout={300}
                          transitionLeaveTimeout={300}
                        >
                          { this.state.showAboutMenu && 
                            <Submenu selector="home"/> 
                          }
                        </ReactCSSTransitionGroup>
                      </div>
                    </li>
                    <li className="nav__menu-item left-menu">
                    <Link to="/farm-goods" className="menu-item-text">Farmgoods</Link>
                    </li>
                    <li className="nav__menu-item left-menu"
                        onMouseLeave={this.handleFarmersLeave}
                    >
                      <NavLink to="/farmers" 
                        className="menu-item-text"
                        onMouseEnter={this.handleFarmersHover}
                        >Farmers
                      </NavLink>
                      <div className="submenu-container">
                        <ReactCSSTransitionGroup
                          transitionName="slide"
                          transitionEnterTimeout={300}
                          transitionLeaveTimeout={300}
                        >
                          { this.state.showFarmerMenu && 
                            <Submenu selector="farmers"/> 
                          }
                        </ReactCSSTransitionGroup>
                      </div>
                    </li>
                    <li className="nav__menu-item left-menu">
                      <Link to="/login" className="menu-item-text">
                        Log In</Link>
                    </li>
                    <li className="nav__menu-item left-menu">
                      <Link to="/signup" className="menu-item-text">
                        Sign Up</Link>
                    </li>
                    <li className="nav__menu-item">
                      {this.miniWidgets()}
                    </li>
                  </ul>
                </nav>
                }
                </div>
              </MediaQuery>
            
              <MediaQuery query="(max-width: 1064px)" >
                <div className="test-container-small">
                <div className="cac-logo-here" align="middle">
                    <a href="http://www.chesteragcenter.com" align="left"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="110" height="102" align="left"/></a>
                </div>
                <div >
                  <SideMenu routes={this.props.routes}/>
                </div>
                <div className="mobile-mini-widgets-small-screen">
                    <span className="widget">
                      <ShareButton 
                        compact
                        socialMedia={'facebook'}
                        url="https://www.facebook.com/Chesteragriculturalcenter-266309927207713/"
                      />
                    </span>
                    <span className="widget">
                    <ShareButton 
                      compact
                      socialMedia={'twitter'}
                      url="https://twitter.com/ChesterAgCenter"
                    />
                    </span>
                    <span className="widget">
                    <ShareButton 
                      compact
                      socialMedia={'google-plus'}
                      url="https://business.google.com/b/111195640342033814688/dashboard/l/04359502499373104089?hl=en"
                    />
                    </span>
                  </div>
                  </div>
              </MediaQuery>

          </div>
          </div>
          <br />
          </header>
    )
    }
  }


//Header.propTypes = {  
//  actions: PropTypes.object.isRequired
//}

function mapStateToProps(state, ownProps) {
  //debugger 
  return {logged_in: state.session};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(sessionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);

/*

<ul id="primary-menu" className="main-nav gradient-hover" role="menu">
            <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-839 first">
              <a href="http://www.chesteragcenter.com/" data-level="1">
                <span className="menu-item-text">
                  <span className="menu-text">Home</span>
                </span>
              </a>
            </li> 
            <li className="menu-item menu-item-type-post_type menu-item-object-post current-menu-item menu-item-has-children menu-item-15093 act has-children"><a href="http://www.chesteragcenter.com/about-us/" data-level="1">
            <span className="menu-item-text">
            <span className="menu-text">About Us</span>
            </span></a><i className="next-level-button"></i>
            </li> 
            
            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-has-children menu-item-15136 has-children"><a href="http://www.chesteragcenter.com/our-farms-our-farmers/" data-level="1">
            <span className="menu-item-text">
            <span className="menu-text">Our Farms &amp; Farmers</span>
            </span></a><i className="next-level-button"></i>
            <ul className="sub-nav hover-style-click-bg level-arrows-on" style="opacity: 0; visibility: hidden; left: 0px;">
            
            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-15156">
            <a href="http://www.chesteragcenter.com/dirty-boots-farm/" data-level="2" className="ripple" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <span className="text-wrap" style="position: relative; z-index: 2;">
            <span className="menu-item-text">
            <span className="menu-text">Dirty Boots Farm</span>
            </span></span>
            <span className="rippleWrap" style="position: absolute; z-index: 1; left: 0px; top: 0px; overflow: hidden; border-radius: 0px;">
            <span className="rippleAnimate" style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px; border-radius: 50%;"></span>
            </span>
            </a>
            </li> 
            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-15155">
            <a href="http://www.chesteragcenter.com/rise-root-farm/" data-level="2" className="ripple" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <span className="text-wrap" style="position: relative; z-index: 2;">
            <span className="menu-item-text">
            <span className="menu-text">Rise &amp; Root Farm</span>
            </span>
            </span>
            <span className="rippleWrap" style="position: absolute; z-index: 1; left: 0px; top: 0px; overflow: hidden; border-radius: 0px;">
            <span className="rippleAnimate" style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px; border-radius: 50%;"></span>
            </span>
            </a>
            </li> 
            <li className="menu-item menu-item-type-post_type menu-item-object-post menu-item-15154">
            <a href="http://www.chesteragcenter.com/sun-sprout-farm/" data-level="2" className="ripple" style="-webkit-tap-highlight-color: rgba(0, 0, 0, 0);">
            <span className="text-wrap" style="position: relative; z-index: 2;">
            <span className="menu-item-text">
            <span className="menu-text">Sun Sprout Farm</span>
            </span></span>
            <span className="rippleWrap" style="position: absolute; z-index: 1; left: 0px; top: 0px; overflow: hidden; border-radius: 0px;">
            <span className="rippleAnimate" style="position: absolute; left: 0px; top: 0px; width: 0px; height: 0px; border-radius: 50%;"></span>
            </span>
            </a>
            </li> 
            
            </ul>


    <div className="branding">
            <div id="site-title" className="assistive-text">Chester Agricultural Center</div>
            <div id="site-description" className="assistive-text">Chester Agricultural Center</div>

            <div className="mini-widgets">
              <div className="soc-ico show-on-desktop near-logo-first-switch in-menu-second-switch custom-bg disabled-border border-off hover-accent-bg hover-disabled-border  hover-border-off">
                <a title="Facebook" href="https://www.facebook.com/Chesteragriculturalcenter-266309927207713/" target="_blank" className="facebook" > 
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Facebook</span>
                </a>
                <a title="Instagram" href="https://www.instagram.com/chesteragcenter/" target="_blank" className="instagram" style={this.aStyle}>
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Instagram</span>
                </a>
                <a title="Twitter" href="https://twitter.com/ChesterAgCenter" target="_blank" className="twitter" style={this.aStyle}>
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Twitter</span>
                </a>
                <a title="Google+" href="https://business.google.com/b/111195640342033814688/dashboard/l/04359502499373104089?hl=en" target="_blank" className="google" style={this.aStyle}>
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Google+</span>
                </a>
              </div>
            </div>

            <div className="mobile-header-bar">
              <div className="mobile-navigation">
                <a href="#" className="dt-mobile-menu-icon">
                  <span className="lines"></span>
                </a>
              </div>
              <div className="mobile-mini-widgets">
              <div className="soc-ico show-on-desktop near-logo-first-switch in-menu-second-switch custom-bg disabled-border border-off hover-accent-bg hover-disabled-border  hover-border-off">
                <a title="Facebook" href="https://www.facebook.com/Chesteragriculturalcenter-266309927207713/" target="_blank" className="facebook" style={this.aStyle}>
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Facebook</span>
                </a>
                <a title="Instagram" href="https://www.instagram.com/chesteragcenter/" target="_blank" className="instagram" style={this.aStyle}>
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Instagram</span>
                </a>
                <a title="Twitter" href="https://twitter.com/ChesterAgCenter" target="_blank" className="twitter" style={this.aStyle}>
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Twitter</span>
                </a>
                <a title="Google+" href="https://business.google.com/b/111195640342033814688/dashboard/l/04359502499373104089?hl=en" target="_blank" className="google" style={this.aStyle}>
                  <span className="soc-font-icon"></span>
                  <span className="screen-reader-text">Google+</span>
                </a>
              </div>
            </div>
          <div className="mobile-branding">
          <a href="http://www.chesteragcenter.com/">
          <img className=" preload-me" src="http://www.chesteragcenter.com/wp-content/uploads/2017/05/Chester-Agricultural-Center-220.jpg" srcset="http://www.chesteragcenter.com/wp-content/uploads/2017/05/Chester-Agricultural-Center-220.jpg 220w, http://www.chesteragcenter.com/wp-content/uploads/2017/05/Chester-Agricultural-Center-220.jpg 220w" width="220" height="202" sizes="220px" alt="Chester Agricultural Center" />
          <img className="mobile-logo preload-me" src="http://www.chesteragcenter.com/wp-content/uploads/2014/03/Chester-Agricultural-Center-140px.jpg" srcset="http://www.chesteragcenter.com/wp-content/uploads/2014/03/Chester-Agricultural-Center-140px.jpg 140w, http://www.chesteragcenter.com/wp-content/uploads/2014/03/Chester-Agricultural-Center-140px.jpg 140w" width="140" height="133" sizes="140px" alt="Chester Agricultural Center"/>
          </a>
          </div>
          </div>
          </div>

*/