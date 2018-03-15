import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import FarmerFarmGoods from './FarmerFarmGoods';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import LogInPage from '../components/LogInPage';
import Logout from '../components/LogoutPage';
//import FarmGoodCard from '../components/farmGoodCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Authorization from './authorization';
import Home from './Home';
import { getUser } from '../actions/sessionActions';
import Header from '../components/common/Header';
import NewFarmgoodForm from './NewFarmgoodForm';
import EditFarmgoodForm from './EditFarmgoodForm';

//<IndexRoute component={HomePage} /> /// NEED TO ADD 
export default class FarmerRoutes extends Component {
  constructor(){
    super()

    this.state = {
      routes: {
        profile: 'profile',
        farmers: 'farmers',
        home: 'home',
        'my farmgoods': 'farm-goods'
      }
    }

  }

  render() {
    return (  
      <BrowserRouter >
        <div className="background-here">
          <Header roleRoutes={this.state.routes}/>
          <Route exact path="/home" />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmerFarmGoods} />
          <Route exact path="/new-farm-good" component={NewFarmgoodForm} />
          <Route path ="/farm-goods/:id/edit" component={EditFarmgoodForm} />
          <Route path="*" render={() => <div></div>} />
          <Route path="/logout" component={Logout}/> 
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