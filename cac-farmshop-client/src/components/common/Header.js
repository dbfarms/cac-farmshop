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

  render() {
    //debugger 
    const routes = this.makeRoutes() 
    //debugger 
    if (sessionStorage.jwt !== "undefined") { //also this isn't actually working so
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


*/