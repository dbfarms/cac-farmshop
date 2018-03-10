import React, {Component} from 'react';  
import { Link, Redirect } from 'react-router-dom';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';  
import * as sessionActions from '../actions/sessionActions';

//NO MAPSTATETOPROPS HERE SO DISPATCH DOESN'T WORK AND SO LOGOUT DOESN'T WORK PROBABLY WILL DELETE THIS...

class Logout extends Component {
    constructor(props) {
      super(props);
      this.logOut = this.logOut.bind(this);
    
    }

logOut(event) {
    event.preventDefault();
    //debugger
    alert('you are logged out')
    //one day i'd like the redirect to work?
    this.props.actions.logOutUser();
  }

  render(){
      const loggingOut = this.logOut()
      return(
        <div>
            {loggingOut}
        </div>
      )
  }

}

/*
const mapStateToProps = (state) => {
    //debugger 
    //state.farmGoods.data[0].relationships.farmer.data.id
    return ({
        farmGoods: state.farmGoods,
        days: state.days,
        user: state.user
    })
  }
*/
  
export default Logout 
//export default connect(mapStateToProps, { })(Logout);