import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import './App.css';
import FarmGoods from './FarmGoods';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import { getFarmGoods } from '../actions/farmGoods';
import Carts from './carts'
import NewFarmgoodForm from './NewFarmgoodForm';
import EditFarmgoodForm from './EditFarmgoodForm';
import LogInPage from '../components/LogInPage';
import SignUpPage from '../components/SignUp';
import FarmGoodCard from '../components/farmGoodCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import Authorization from './authorization'
import Home from './Home'
import Header from '../components/common/Header'


class App extends Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
      
    }
    //this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }
  
    //to find the nearest pickup location - UNCOMMENT BELOW 
  //  navigator.geolocation.getCurrentPosition(position => {
  //    const { latitude, longitude } = position.coords
  //  });

  componentWillMount(){
    this.props.getFarmGoods()
    //WHEN I PUT ANOTHER GET REQUEST HERE IT BREAKS THE PROGRAM. BUT WHY?
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      farmGoods_array: nextProps.farmGoods.data
    })
  }

  requireAuth(nextState, replace) {  
    if (!sessionStorage.jwt) {
      return <Redirect to='/login' />
      //state: { nextPathname: nextState.location.pathname } //********************** for when you want to go back to this page
    }
  }
  


  render() {

    return (
      <div>
     
      <BrowserRouter >
        <div className="background-here">
          <Header />
          <Route path="/login" component={LogInPage} />
          <Route path="/signup" component={SignUpPage} />
          
          <Route exact path="/home" 
                 component={Authorization(Home, ['admin'])}/>
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmGoods} />
          <Route exact path="/new-farm-good" render={() => ( 
            this.requireAuth() ? (
              <Redirect to="/login"/>
            ) : (
              <NewFarmgoodForm />
            )
          )}/>
          <Route exact path="/farm-goods/:id/edit" component={EditFarmgoodForm} />
          <Route exact path ="/farm-goods/:id" component={FarmGoodCard} />
          <Route exact path="/cart" component={Carts} />
          <Route path="*" render={() => <div></div>} />
        </div>
      </BrowserRouter >
      </div>
    );
  }
}

//<Route path="/logout" component={LogOut} />

const mapStateToProps = (state) => {
  return ({
      farmGoods: state.farmGoods,
  })
}

export default connect(mapStateToProps, { getFarmGoods })(App); // 


/*
component={NewFarmgoodForm} 

*/