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

/*
Header.propTypes = {  
  actions: PropTypes.object.isRequired
}
*/

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