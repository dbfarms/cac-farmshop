import React from 'react'
import { slide as Menu } from 'react-burger-menu';


export default class SideMenu extends React.Component {
    constructor(props) {
        super(props)
        //debugger 
    }

    showSettings (event) {
        event.preventDefault();
    }

    makeRoutes(){
        switch(sessionStorage.role){
            case 'customer':
                return (
                    <Menu right>
                        <a id="home" className="menu-item" href="/">Home</a>
                        <a id="farmers" className="menu-item" href="/farmers">Farmers</a>
                        <a id="farm-goods" className="menu-item" href="/farm-goods">Farmgoods</a>
                        <a id="cart" className="menu-item" href="/cart">Cart</a>
                        <button id="logout" className="menu-item" onClick={() => this.props.logout(this)}>Log Out</button>
                        <a onClick={ this.showSettings } className="menu-item--small" />
                    </Menu>
                )
            case 'farmer':
            return (
                <Menu right>
                    <a id="profile" className="menu-item" href="/">Profile</a>
                    <a id="farmers" className="menu-item" href="/farmers">Farmers</a>
                    <a id="orders" className="menu-item" href="/farmers">Orders</a>
                    <a id="farm-goods" className="menu-item" href="/farm-goods">My Farmgoods</a>
                    <button id="logout" className="menu-item" onClick={() => this.props.logout(this)}>Log Out</button>
                    <a onClick={ this.showSettings } className="menu-item--small" />
                </Menu>
            )
            case 'admin':
              //debugger 
              return (
                <Menu right>
                    <a id="signup" className="menu-item" href="/">Create New User</a>
                    <a id="farmers" className="menu-item" href="/farmers">Farmers</a>
                    <a id="farmgoods" className="menu-item" href="/farm-goods">Farmgoods</a>
                    <a id="users" className="menu-item" href="/contact">Users</a>
                    <button id="logout" className="menu-item" onClick={() => this.props.logout(this)}>Log Out</button>
                    <a onClick={ this.showSettings } className="menu-item--small" />
                </Menu>
              )
            default:
              return (
                <Menu right>
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/farmers">Farmers</a>
                    <a id="farmgoods" className="menu-item" href="/farm-goods">Farmgoods</a>
                    <a id="login" className="menu-item" href="/login">Log In</a>
                    <a id="signup" className="menu-item" href="/signup">Sign Up</a>
                    <a onClick={ this.showSettings } className="menu-item--small"/>
                </Menu>
              ) 
        }
    }

    render() {
        //debugger 
        return (
            <div>
              {this.makeRoutes()}
            
            </div>
        )
    }
}

  