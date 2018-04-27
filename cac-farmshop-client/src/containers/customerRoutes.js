import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import CustomerFarmGoods from './customerFarmGoodsPage';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import FarmGoodCard from '../components/farmGoodCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorization from './authorization';
import Home from './Home';
import { getUser } from '../actions/sessionActions';
import Header from '../components/common/Header';
import Cart from './carts';
import Checkout from './Checkout';
//import FarmgoodView from '../components/FarmgoodView'
//import FarmerView from '../components/FarmerView'

//<IndexRoute component={HomePage} /> /// NEED TO ADD 
export default class CustomerRoutes extends Component {
  constructor(){
    super()

    this.state = {
      routes: {
        home: 'home',
        farmers: 'farmers',
        farmgoods: 'farm-goods',
        cart: 'cart'
      }
    }
  }

  render() {
    return (  
      <BrowserRouter >
        <div className="background-here">
          <Header roleRoutes={this.state.routes}/>
          <Route exact path="/home" />
          <Route path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={CustomerFarmGoods} />
          <Route path="*" render={() => <div></div>} />
          <Route exact path='/cart' component={Cart}/>
          <Route exact path='/checkout' component={Checkout}/>

        </div>
      </BrowserRouter >
    );
  }
}

function requireAuth(nextState, replace) {  
    if (!sessionStorage.jwt) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }

/*



*/

