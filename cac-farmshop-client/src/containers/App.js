import React, { Component } from 'react';
import Navbar from '../components/Navbar'
//difference between react and react, component??
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
//import { connect } from 'react-redux'
import './App.css';

import FarmGoods from './FarmGoods';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import Carts from './carts'

class App extends Component {
/* MOVED TO REDUX METHOD FOR STATE
  constructor(props) {
    super(props)

    this.state = {
      carts: [],
      farmers: [],
      farmGoods: [],
      test: ''
    }
  }
*/
  componentDidMount() {
    //to find the nearest pickup location - UNCOMMENT BELOW 
  //  navigator.geolocation.getCurrentPosition(position => {
  //    const { latitude, longitude } = position.coords
  //  });
  }


  render() {

    return (
      <BrowserRouter >
        <div className="background-here">

          <Navbar />
          <Route exact path="/" render={() => <div>Home For Now</div>} />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmGoods} />
          <Route exact path="/cart" component={Carts} />
          <Route path="*" render={() => <div>Page Not Found</div>} />
        </div>
      </BrowserRouter >
    );
  }
}

export default App
