import React, { Component } from 'react';
import Navbar from '../components/Navbar'
//difference between react and react, component??
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
import { connect } from 'react-redux'
import './App.css';

//import { Link } from 'react-router-dom'

import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import Carts from './carts'


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

  render() {

    return (
      <BrowserRouter >
        <div>

          <Navbar />
          <Route exact path="/" render={() => <div>Home For Now</div>} />
          <Route path='/farmers' component={FarmersPage} >
            <Route path="/farmers/:id" component={FarmerShow} />
          </Route>
          <Route exact path="/cart" component={Carts} />

        </div>
      </BrowserRouter >
    );
  }
}

export default App
