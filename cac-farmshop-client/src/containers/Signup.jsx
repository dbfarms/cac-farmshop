import React from 'react'
import axios from 'axios'
import Vue from 'vue'

/*
      var FormCsrfInput = React.createClass({
        render() {
          const token = $('meta[name="csrf-token"]').attr('content');
      
          return (
            <input type="hidden" name="authenticity_token" value={token} readOnly={true} />
          )
        }
      });


*/

class Signup extends React.Component {
    constructor(props){
      super(props);
      this.handleSignup = this.handleSignup.bind(this);
      this.state = {
        token: ''
      }
    }

    handleSignup(e) {
      e.preventDefault();
      let that = this
      //Vue.use(axios)
      //
     //let token = document.getElementsByName('csrf-token')[0].getAttribute('content')
      //axios.defaults.headers.common['X-CSRF-Token'] = token
      //axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
      axios.defaults.headers.common['Accept'] = 'application/json'
      //
      axios.post('http://localhost:3000/users', {
        user: {
          email: document.getElementById("email").value,
          password: document.getElementById("password").value,
          password_confirmation: document.getElementById("password_confirmation").value,
        },
        authenticity_token: '',
        //token: document.getElementsByName('csrf-token')[0].getAttribute('content')
      })
      .then(function(response){
        that.props.changePage("delete");
        token: document.getElementsByName('csrf-token')[0].getAttribute('content')
        //that.props.updateCurrentUser(email);
      })
      .catch(function(error){
        console.log(error)
      })
  }

  


  render() {
    return (
        <div>
          <h2>Signup</h2>
          <form >
            <input id="email" placeholder="email"/>
            <input id="password" placeholder="password"/>
            <input id="password_confirmation" placeholder="retype password"/>
            
            <input type="hidden" id="authenticity_token" name="authenticity_token" value={this.state.token} readOnly={true} />

            <button onClick={this.handleSignup}>Submit</button>
          </form>
          <button onClick={() => this.props.changePage("login")}>Back to Login</button>
        </div>
      );
    };
  };

  export default Signup 