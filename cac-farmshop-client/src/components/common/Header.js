import React, {PropTypes} from 'react';  
import { Link, NavLink, } from 'react-router-dom';  
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
      showFarmerMenu: false,
      routes: undefined 
    };

    this.logOut = this.logOut.bind(this);
  }

  //{this.determineRoutes()}
  componentWillMount() {
    //debugger
    switch(sessionStorage.role){
      case 'customer':
        this.setState ({
          routes: {
            home: 'home',
            farmers: 'farmers',
            farmgoods: 'farm-goods',
            cart: 'cart'
          }
        }) 
      case 'farmer':
        this.setState ({
          routes: {
          profile: 'profile',
          farmers: 'farmers',
          home: 'home',
          orders: 'orders',
          'my farmgoods': 'farm-goods'
          }
        }) 
      case 'admin':
        this.setState ({
          routes: {
            'create new user': 'signup',
            farmers: 'farmers',
            home: 'home',
            farmgoods: 'farm-goods',
            users: 'users'
          }
        }) 
      default:
      //debugger
        this.setState ({
          routes: {
            'Sign Up': 'signup',
            farmers: 'farmers',
            home: 'home',
            farmgoods: 'farm-goods'
          }
        }) 
    }
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

  checkRoutes() {
    switch(sessionStorage.role){
      case 'customer':
        return (
           {
            home: 'home',
            farmers: 'farmers',
            farmgoods: 'farm-goods',
            cart: 'cart'
          }
        ) 
      case 'farmer':
        return (
          {
          profile: 'profile',
          farmers: 'farmers',
          home: 'home',
          orders: 'orders',
          'my farmgoods': 'farm-goods'
          }
        ) 
      case 'admin':
        return (
          {
            'create new user': 'signup',
            farmers: 'farmers',
            home: 'home',
            farmgoods: 'farm-goods',
            users: 'users'
          }
        ) 
      default:
      //debugger
        return (
          {
            'Sign Up': 'signup',
            farmers: 'farmers',
            home: 'home',
            farmgoods: 'farm-goods'
          }
        ) 
    }
  }

  makeRoutes(){
    const routesLinks = [] 
    //debugger 
    const routesObject = this.checkRoutes(); 
    //debugger 
    Object.entries(routesObject).map(function(keyName, keyIndex) {
      routesLinks.push(keyName)
    })
    const routesLength = (routesLinks.length - 1)
    //debugger 
    return (
      <nav className="nav1">
        <ul className="nav__menu header-nav">
          <li>
            <div className="cac-logo-here" align="middle">
              <a href="http://www.chesteragcenter.com" align="middle"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="110" height="102" align="middle"/></a>
            </div>
          </li>
          {routesLinks.map((route, keyIndex) => { 
            //debugger 
            return (
                <span key={keyIndex}>
                  {keyIndex === routesLength &&
                    <span key={keyIndex}>
                      {this.menuSelector(route)}
                      <li className="nav__menu-item left-menu">
                      <a className="menu-item-text" 
                         href="/" onClick={this.logOut}>log out</a>
                      </li>
                      <div className="nav__widget">
                        {this.miniWidgets()}
                      </div>
                    </span>
                  }
                  {keyIndex !== (routesLength) &&
                  <span key={keyIndex}>
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
            <a href={`/${route[1]}`} 
              className="menu-item-text"
              onMouseEnter={this.handleHover}> {route[0]} 
            </a>
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
            <a href={`/${route[1]}`} 
              className="menu-item-text"
              onMouseEnter={this.handleFarmersHover}> {route[0]} 
            </a>
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
            <a href={`/${route[1]}`} 
              className="menu-item-text"> {route[0]} 
            </a>
          </li>
        )
    }
  }

  welcomeFunc(){
    switch (sessionStorage.role){
      case 'undefined':
        return (<p className="welcome">Welcome VISITOR</p> )
      default:
        return (<p className="welcome">Welcome {sessionStorage.name}</p>)
      /*
      case 'customer':
        return (<p className="welcome">Welcome {sessionStorage.name}</p>)
      case 'farmer':
        return (<p className="welcome">Welcome {sessionStorage.}</p>)
      case 'admin':
        return (<p className="welcome">Welcome {sessionStorage.name}</p>)
      */
    }
  }

  showWidgets = () => {
    return (
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
    )
  }

  miniWidgets = () => {
    return (
      <div className="widgetswidgets">
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
                <div>
                  {sessionStorage.jwt !== "undefined" &&
                    <div className="test-container1">
                        {routes}
                    </div>
                  }
                  {sessionStorage.jwt === "undefined" && 
                    <div className="test-container">
                      <nav className="nav">
                        <ul className="nav__menu header-nav">
                          <li>
                            <div className="cac-logo-here" align="middle">
                              <a href="http://www.chesteragcenter.com" align="middle"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="110" height="102" align="middle"/></a>
                            </div>
                          </li>
                          <li className="nav__menu-item"
                              onMouseLeave={this.handleLeave}
                          >
                            <a href="/" 
                              className="menu-item-text"
                              onMouseEnter={this.handleHover}
                              >Home
                            </a>
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
                            <a href="/farm-goods" className="menu-item-text">Farmgoods</a>
                          </li>
                          <li className="nav__menu-item left-menu"
                              onMouseLeave={this.handleFarmersLeave}
                          >
                            <a href="/farmers" 
                              className="menu-item-text"
                              onMouseEnter={this.handleFarmersHover}
                              >Farmers
                            </a>
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
                            <a href="/login" className="menu-item-text">
                              Log In</a>
                          </li>
                          <li className="nav__menu-item left-menu">
                            <a href="/signup" className="menu-item-text">
                              Sign Up</a>
                          </li>
                        
                          <div className="nav__widget">
                              {this.miniWidgets()}
                          </div>
                        </ul>
                      </nav>
                    </div>
                  }
                </div>
              </MediaQuery>
            
              <MediaQuery query="(max-width: 965px)" >
                <div className="test-container-small">
                  <div className="cac-logo-here" align="middle">
                      <a href="http://www.chesteragcenter.com" align="left"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="110" height="102" align="left"/></a>
                  </div>
                  <div className="sideMenuSmall">
                    <SideMenu routes={this.state.routes} logout={this.logOut}/>
                  </div>
                  <MediaQuery query="(min-width: 328px)" >
                    {this.showWidgets()}
                  </MediaQuery>
                  </div>
              </MediaQuery>
          </div>
          {this.welcomeFunc}
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

import React, {PropTypes} from 'react';  
import { Link, NavLink, Router } from 'react-router-dom';  
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
      showFarmerMenu: false,
      routes: undefined 
    };

    this.logOut = this.logOut.bind(this);
  }

  //{this.determineRoutes()}
  componentWillMount() {
    //debugger
    switch(sessionStorage.role){
      case 'customer':
        this.setState ({
          routes: {
            home: 'home',
            farmers: 'farmers',
            farmgoods: 'farm-goods',
            cart: 'cart'
          }
        }) 
      case 'farmer':
        this.setState ({
          routes: {
          profile: 'profile',
          farmers: 'farmers',
          home: 'home',
          orders: 'orders',
          'my farmgoods': 'farm-goods'
          }
        }) 
      case 'admin':
        this.setState ({
          routes: {
            'create new user': 'signup',
            farmers: 'farmers',
            home: 'home',
            farmgoods: 'farm-goods',
            users: 'users'
          }
        }) 
      default:
      //debugger
        this.setState ({
          routes: {
            'Sign Up': 'signup',
            farmers: 'farmers',
            home: 'home',
            farmgoods: 'farm-goods'
          }
        }) 
    }
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

  makeRoutes(){
    const routesLinks = [] 
    //debugger 
    Object.entries(this.state.routes).map(function(keyName, keyIndex) {
      routesLinks.push(keyName)
    })
    const routesLength = (routesLinks.length - 1)
    
    return (
      <nav className="nav">
        <ul className="nav__menu header-nav">
          <li>
            <div className="cac-logo-here" align="middle">
              <a href="http://www.chesteragcenter.com" align="middle"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="110" height="102" align="middle"/></a>
            </div>
          </li>
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
      <div className="widgetswidgets">
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
                    <li>
                      <div className="cac-logo-here" align="middle">
                        <a href="http://www.chesteragcenter.com" align="middle"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/5adf88708a922dc9c0519e2a/5adf932570a6add7bc7cb2e0/1524601641517/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" width="110" height="102" align="middle"/></a>
                      </div>
                    </li>
                    <li className="nav__menu-item"
                        onMouseLeave={this.handleLeave}
                    >
                      <Link to="/" 
                        className="menu-item-text"
                        onMouseEnter={this.handleHover}
                        >Home
                      </Link>
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
                  </ul>
                  <div className="nav__menu-item">
                      {this.miniWidgets()}
                  </div>
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
                    <SideMenu routes={this.state.routes} logout={this.logOut}/>
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


*/