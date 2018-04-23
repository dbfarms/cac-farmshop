import React from 'react'
import { slide as Menu } from 'react-burger-menu';


export default class SideMenu extends React.Component {
//    constructor() {
//        super()
//    }

    showSettings (event) {
        event.preventDefault();
        
    }

    render() {
        return (
            <div>
                <Menu >
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
                </Menu>
            </div>
        )
    }
}

  