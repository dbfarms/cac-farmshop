import React, {PropTypes} from 'react';  
import { Link, NavLink } from 'react-router-dom';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as sessionActions from '../../actions/sessionActions';
import '../../index.css';

class Header extends React.Component {  
  constructor(props) {
    super();
    this.logOut = this.logOut.bind(this);
    
    //debugger 
  }

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
      //debugger 
      routesLinks.push(keyName)
    })
    //debugger 
    return routesLinks.map((route, keyIndex) => {
      //debugger 
      return (
        <span key={keyIndex}>
        {keyIndex === routesLength &&
          <span>
          <NavLink to={`/${route[1]}`} 
          className="navLink"> {route[0]} </NavLink>
          {" | "}
          <a href="/" onClick={this.logOut}>log out</a>
          </span>
        }
        {keyIndex !== (routesLinks.length-1) &&
        <span>
        <NavLink to={`/${route[1]}`}
        className="navLink"> {route[0]} </NavLink>
         {" | "}
        </span>
        }
        </span>
        )
    }) 
  }



  aStyle = {
    visibility: "visible"
  };

  

  render() {
    //debugger 
    const routes = this.makeRoutes() 
    //debugger 
    return (
      <header className="header-bar">

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
          {sessionStorage.jwt !== "undefined" &&
            <div>
              <nav className="background">
                {routes}
              </nav>
            </div>
          }
          {sessionStorage.jwt === "undefined" && 
            <nav className="background">
            <NavLink to="/" 
              className="active">Home</NavLink>
            {" | "}
            <Link to="/farm-goods" className="active">Farmgoods</Link>
            {" | "}
            <Link to="/farmers" 
              className="active">Farmers</Link>
            {" | "}
            <Link to="/login" className="active">
              log in</Link>
            {" | "}
            <Link to="/signup" className="active">
              sign up</Link>
          </nav>
          }
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