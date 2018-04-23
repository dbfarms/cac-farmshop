import React from 'react'
import { slide as Menu } from 'react-burger-menu';


export default class SideMenu extends React.Component {
    constructor(props) {
        super(props)
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
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
                </Menu>
            }
            {sessionStorage.jwt === "undefined" &&
                <Menu >
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/farmers">Farmers</a>
                    <a id="contact" className="menu-item" href="/farm-goods">Farmgoods</a>
                    <a id="contact" className="menu-item" href="/login">Log In</a>
                    <a id="contact" className="menu-item" href="/signup">Sign Up</a>
                    <a onClick={ this.showSettings } className="menu-item--small"/>
                </Menu>
            }
            </div>
        )
    }
}

  