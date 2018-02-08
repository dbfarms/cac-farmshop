import React, { Component } from 'react';
import Navbar from '../components/Navbar'
//difference between react and react, component??
import './App.css';
import Carts from './carts'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      carts: [],
      viewKey: ''
    }
  }

  componentDidMount() {
    //to find the nearest pickup location
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords
    });
  }

  handleViewChange = viewKey => this.setState({ viewKey: viewKey })

  render() {

    return (
      <div className="App">
      <Navbar changeView={this.handleViewChange} />
      <Carts/>
      </div>
    );
  }
}

export default App;
