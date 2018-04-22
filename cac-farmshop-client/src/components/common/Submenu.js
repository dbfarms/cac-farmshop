import React from 'react'

export default class Submenu extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selector: this.props.seletor
    }
  }

  render() {
    //debugger 

    if (this.props.selector === "home") {
      return (
        <ul className="nav__submenu">
          <li className="nav__submenu-item">
            <a>About</a>
          </li>
          <li className="nav__submenu-item">
            <a>Contact</a>
          </li>
          <li className="nav__submenu-item">
            <a>Something Else</a>
          </li>
        </ul>
      )
    } else if (this.props.selector === "farmers") {
      return (
        <ul className="nav__submenu">
          <li className="nav__submenu-item">
            <a href="">Jim's Eggs</a>
          </li>
          <li className="nav__submenu-item">
            <a>Will's Beef</a>
          </li>
          <li className="nav__submenu-item">
            <a className="nav__submenu-item"href="http://www.chesteragcenter.com/dirty-boots-farm/">DBFARMS</a>
          </li>
        </ul>
      )
    } else {
      return (
        <p>where will i be?</p>
      )
    }
    
  }
}

/*
import React from 'react'
//import CSSTransitionGroup from 'react-addons-css-transition-group'; // ES6

//let CSSTransitionGroup = React.addons.CSSTransitionGroup;

export default class Submenu extends React.Component {

  render() {
    debugger 
    console.log("test")
    return (
      <ul className="nav__submenu">
        <li className="nav__submenu-item ">
          <a>Our Company</a>
        </li>
        <li className="nav__submenu-item ">
          <a>Our Team</a>
        </li>
        <li className="nav__submenu-item ">
          <a>Our Portfolio</a>
        </li>
      </ul>
    )
  }
}

/*

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAboutMenu: false
    };
  }
  
  handleHover = (event) => {
    this.setState({ showAboutMenu: true });
  };
  
  handleLeave = (event) => {
    this.setState({ showAboutMenu: false });
  };
  
  render() {
    return (
      <nav className="nav">
        <ul className="nav__menu">
          <li className="nav__menu-item">
            <a>Home</a>
          </li>
          <li className="nav__menu-item" onMouseLeave={this.handleLeave}>
            <a onMouseEnter={this.handleHover}>
              About
            </a>
            <div className="submenu-container">
              <CSSTransitionGroup
                transitionName="slide"
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}
              >
                { this.state.showAboutMenu && <Submenu /> }
              </CSSTransitionGroup>
            </div>
          </li>

          <li className="nav__menu-item">
            <a>Contact</a>
          </li>
        </ul>
      </nav>
    )
  }
}
*/