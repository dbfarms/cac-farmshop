import React, {PropTypes} from 'react';  
import { Link, NavLink } from 'react-router-dom';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as sessionActions from '../../actions/sessionActions';
import './header.css';

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
    Object.entries(this.props.roleRoutes).map(function(keyName, keyIndex) {
      routesLinks.push(keyName)
    })
    return routesLinks.map((route, keyIndex) => {
      //debugger 
      return (
        <span>
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

  render() {
    const routes = this.makeRoutes() 
    //debugger 
    if (this.props.logged_in) {
      //debugger 
      return (
        <nav className="background">
          {routes}
        </nav>
      );
    } else {
      //debugger 
      return (
        <nav className="background">
          <NavLink to="/" 
            activeClassName="active">Home</NavLink>
          {" | "}
          <Link to="/farm-goods" activeClassName="active">Farmgoods</Link>
          {" | "}
          <Link to="/farmers" 
            activeClassName="active">Farmers</Link>
          {" | "}
          <Link to="/login" activeClassName="active">
            log in</Link>
          {" | "}
          <Link to="/signup" activeClassName="active">
            sign up</Link>
        </nav>
      );
    }
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
import { Link, NavLink } from 'react-router-dom';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as sessionActions from '../../actions/sessionActions';
import './header.css';

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

  render() {
    
    if (this.props.logged_in) {
      //debugger 
      return (
        <nav className="background">
          <NavLink to="/" 
            activeClassName="active">Home</NavLink>
          {" | "}
          <Link to="/farm-goods" activeClassName="active">Farm Goods</Link>
          {" | "}
          <Link to="/farmers" 
            activeClassName="active">Farmers</Link>
          {" | "}
          <a href="/" onClick={this.logOut}>log out</a>
        </nav>
      );
    } else {
      //debugger 
      return (
        <nav className="background">
          <NavLink to="/" 
            activeClassName="active">Homes</NavLink>
          {" | "}
          <Link to="/farm-goods" activeClassName="active">Farmgoods</Link>
          {" | "}
          <Link to="/farmers" 
            activeClassName="active">Farmers</Link>
          {" | "}
          <Link to="/login" activeClassName="active">
            log in</Link>
        </nav>
      );
    }
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


import React, {PropTypes} from 'react';  
import { Link, NavLink } from 'react-router-dom';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as sessionActions from '../../actions/sessionActions';
import './header.css';

class Header extends React.Component {  
  constructor(props) {
    super();

    state = {
      auth: false,
      slide: 0,  // How much should the Navbar slide up or down
      lastScrollY: 0,  // Keep track of current position in state
    };

    this.logOut = this.logOut.bind(this);
    //debugger 
  }

  logOut(event) {
    event.preventDefault();
    alert('you are logged out')
    //one day i'd like the redirect to work?
    this.props.actions.logOutUser();
  }

  componentWillMount() {
    // When this component mounts, begin listening for scroll changes
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { lastScrollY } = this.state; 
    const currentScrollY = window.scrollY;


    if (currentScrollY > lastScrollY) {
      this.setState({ slide: '-48px' });
    } else {
      this.setState({ slide: '0px' });
    }
    this.setState({ lastScrollY: currentScrollY });
  };

  handleRoutes = () => {
    <div>

    </div>
  }

  render() {
    
    if (this.props.logged_in) {
      //debugger 
      return (
        <nav className="background">
          <NavLink to="/" 
            activeClassName="active">Home</NavLink>
          {" | "}
          <Link to="/farm-goods" activeClassName="active">Farm Goods</Link>
          {" | "}
          <Link to="/farmers" 
            activeClassName="active">Farmers</Link>
          {" | "}
          <a href="/" onClick={this.logOut}>log out</a>
        </nav>
      );
    } else {
      //debugger 
      return (
        <nav className="background">
          <NavLink to="/" 
            activeClassName="active">Homes</NavLink>
          {" | "}
          <Link to="/farm-goods" activeClassName="active">Farmgoods</Link>
          {" | "}
          <Link to="/farmers" 
            activeClassName="active">Farmers</Link>
          {" | "}
          <Link to="/login" activeClassName="active">
            log in</Link>
        </nav>
      );
    }
  }
}

/*
Header.propTypes = {  
  actions: PropTypes.object.isRequired
}


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