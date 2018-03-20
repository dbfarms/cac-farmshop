import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import CustomerFarmGoods from './customerFarmGoodsPage';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import LogInPage from '../components/LogInPage';
import SignUpPage from '../components/SignUp';
import FarmGoodCard from '../components/farmGoodCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorization from './authorization';
import Home from './Home';
import { getUser } from '../actions/sessionActions';
import Header from '../components/common/Header';
import Cart from './carts'

export default class DefaultRoutes extends Component {
  constructor(){
    super()

    this.state = {
      routes: {
        'Sign Up': 'signup',
        farmers: 'farmers',
        home: 'home',
        farmgoods: 'farm-goods'
      }
    }
  }

  render() {
    return (  
      <BrowserRouter >
        <div className="background-here">
          <Header roleRoutes={this.state.routes}/>
          <Route path="/login" component={LogInPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route exact path="/home" />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={CustomerFarmGoods} />
          <Route path="*" render={() => <div></div>} />
          <Route exact path='/cart' component={Cart}/>
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

import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import FarmGoods from './FarmGoods';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import LogInPage from '../components/LogInPage';
import AdminSignUpPage from '../components/admin/AdminSignUp';
import FarmGoodCard from '../components/farmGoodCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorization from './authorization';
import Home from './Home';
import { getUser } from '../actions/sessionActions';
import Header from '../components/common/Header';

//<IndexRoute component={HomePage} /> /// NEED TO ADD 
export default function FarmerRoutes() {
    return (  
      <BrowserRouter >
        <div className="background-here">
            <Header />
          <Route path="/login" component={LogInPage} />
          <Route path="/signup" component={AdminSignUpPage} />
          
          <Route exact path="/home" />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmGoods} />
          <Route exact path ="/farm-goods/:id" component={FarmGoodCard} />
          <Route path="*" render={() => <div></div>} />
        </div>
      </BrowserRouter >
  );
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

<Route exact path="/home" 
                 component={Authorization(Home, ['admin', this.props.logged_in, sessionStorage.jwt])} />




*/

