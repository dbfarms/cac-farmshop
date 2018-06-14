import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import AdminFarmGoods from './adminFarmGoods';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import FarmgoodShow from './FarmgoodShow';
import FarmgoodIndex from './FarmgoodIndex';
import LogInPage from '../components/LogInPage';
import AdminSignUpPage from '../components/admin/AdminSignUp';
import FarmGoodCard from '../components/farmGoodCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorization from './authorization';
import Home from './Home';
import { getUser } from '../actions/sessionActions';
import Users from './Users';
import AdminNewFarmgoodForm from './adminNewFarmGoodForm'; //actually this will have to be its own component
import AdminEditFarmgoodForm from './AdminEditFarmgoodForm'; //same with this 

//<IndexRoute component={HomePage} /> /// NEED TO ADD 
export default class AdminRoutes extends Component {
  constructor(){
    super()

    this.state = {
      routes: {
        'create new user': 'signup',
        farmers: 'farmers',
        farmgoods: 'farmgoods',
        users: 'users',
      }
    }

  }

  render() {
    return (  
      <BrowserRouter >
        <div className="background-here">
          <Route path="/signup" component={AdminSignUpPage} />
          <Route exact path="/home" />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path='/farmers/:id' component={FarmerShow} />
          <Route exact path='/farmers/:id/farmgoods' component={FarmgoodIndex} />
          <Route exact path='/farmers/:id/farmgoods/:id' component={FarmgoodShow} />
          <Route path ="/farmers/:id/farmgoods/:id/edit" component={AdminEditFarmgoodForm} />
          <Route exact path="/farmgoods" component={AdminFarmGoods} />
          <Route exact path="/new-farm-good" component={AdminNewFarmgoodForm} />
          <Route exact path="/users" component={Users} />
          <Route path="*" render={() => <div></div>} />
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