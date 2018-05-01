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
    //debugger
    if (event.preventDefault) {
      event.preventDefault();
      alert('you are logged out')
      //one day i'd like the redirect to work?
      this.props.actions.logOutUser();
    } else {
      alert('you are logged out')
      //one day i'd like the redirect to work?
      this.props.actions.logOutUser();
    }
    
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
              <MediaQuery query="(min-width: 965px)" >
                <div className="test-container">
                <div className="cac-logo-here" align="middle">
                    <a href="http://www.chesteragcenter.com" align="middle"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="198" height="181" align="middle"/></a>
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
            
              <MediaQuery query="(max-width: 965px)" >
                <div className="test-container-small">
                  <div className="cac-logo-here" align="middle">
                      <a href="http://www.chesteragcenter.com" align="left"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="110" height="102" align="left"/></a>
                  </div>
                  <div className="sideMenuSmall">
                    <SideMenu routes={this.props.routes} logout={this.logOut}/>
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

*/