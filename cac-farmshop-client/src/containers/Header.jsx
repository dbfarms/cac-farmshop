import React from 'react'
import Signup from './Signup'
import Logout from './Logout'
import LoginHere from './LoginHere'

class Header extends React.Component {
    constructor(props){
        super(props);
        if (this.props.currentUser == null){
          this.state = {
            page:"login"
          }
        } else {
          this.state = {
            page: "delete"
          }
        }
        this.changePage = this.changePage.bind(this);
      }
    changePage(newPage) {
        this.setState({
          page: newPage
        })
      }
    
    render() {
        switch(this.state.page) {
          case "signup":
            return <Signup changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
          case "login":
            return <LoginHere changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
          case "delete":
            return <Logout changePage={this.changePage} updateCurrentUser={this.props.updateCurrentUser}/>
        }
      }
    }

export default Header 