import React from 'react'
import axios from 'axios'

class LoginHere extends React.Component {
    constructor(props){
      super(props);
      this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(e) {
        e.preventDefault();
        let that = this
        axios.post('http://localhost:3000/users', {
          user: {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            password_confirmation: document.getElementById("password_confirmation").value
          }
        })
        .then(function(response){
          that.props.changePage("delete");
          //that.props.updateCurrentUser(email);
        })
        .catch(function(error){
          console.log(error)
        })
    }

    handleViewSignUp(){
      this.props.changePage("signup")
    }

  render() {
    return (
        <div>
          <button onClick={this.handleViewSignUp.bind(this)}>New? Signup here</button>
          <h2>Login</h2>
          <form>
            <input id="email" placeholder="email"/>
            <input id="password" placeholder="password"/>
            <input id="password_confirmation" placeholder="retype password"/>
            <button onClick={this.handleLogin}>Submit</button>
          </form>
          <button onClick={() => this.props.changePage("login")}>Back to Login</button>
        </div>
        
      );
    };
  };

  export default LoginHere