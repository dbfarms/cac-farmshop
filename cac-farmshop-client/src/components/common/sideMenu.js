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

    render() {
        //debugger 
        return (
            <div>
            {sessionStorage.jwt !== "undefined" &&
                <Menu >
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/farmers">Farmers</a>
                    <a id="farmgoods" className="menu-item" href="/farm-goods">Farmgoods</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <button id="logout" className="menu-item" onClick={() => this.props.logout(this)}>Log Out</button>
                    <a onClick={ this.showSettings } className="menu-item--small" />
                </Menu>
            }
            {sessionStorage.jwt === "undefined" &&
                <Menu >
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/farmers">Farmers</a>
                    <a id="farmgoods" className="menu-item" href="/farm-goods">Farmgoods</a>
                    <a id="login" className="menu-item" href="/login">Log In</a>
                    <a id="signup" className="menu-item" href="/signup">Sign Up</a>
                    <a onClick={ this.showSettings } className="menu-item--small"/>
                </Menu>
            }
            </div>
        )
    }
}

  