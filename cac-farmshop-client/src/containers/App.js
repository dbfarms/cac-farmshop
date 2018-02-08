import React, { Component } from 'react';
import Navbar from '../components/Navbar'
//difference between react and react, component??
import { connect } from 'react-redux'
import './App.css';
import Carts from './carts'
//import { Link } from 'react-router-dom'
import { changeRoute } from '../actions/routeAction';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      carts: [],
    }
  }

  componentDidMount() {
    //to find the nearest pickup location
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
    });
  }

  handleRouteChange = routeName => {
    //debugger
    this.props.changeRoute({ routeName: routeName })
  }

  render() {

    const { routeName } = this.props

    return (
      <div className="App">
      <Navbar changeRoute={this.handleRouteChange} />
      
      <Carts/>
      </div>
    );
  }
}

export default connect(
  state => ({
    routeName: state.route.routeName
  }),
  { changeRoute })(App);
