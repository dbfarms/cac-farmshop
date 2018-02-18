import React from 'react'
import axios from 'axios'

class Logout extends React.Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
      }
    handleLogout(e) {
        e.preventDefault();
        let that = this
        let email = this.props.currentUser
        axios.delete('http://localhost:3000/users/sign_out', {
        })
        .then(function(response){
          that.props.changePage("login")
        })
        .catch(function(error){
          console.log(error)
        })
      }
    render() {
        return (
          <button onClick={this.handleLogout}>Sign Out</button>
        );
      };
    }

    export default Logout