import React, { Component } from 'react';
import Navbar from '../components/Navbar'
//difference between react and react, component??
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
//import { connect } from 'react-redux'
import './App.css';
import Header from './Header'
import axios from 'axios'
import FarmGoods from './FarmGoods';
import FarmersPage from './FarmersPage';
import FarmerShow from './FarmerShow';
import Carts from './carts'

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentUser: null
      
    }
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }
  //Vue.use(axios)
  
  
  componentDidMount() {
    let that = this 
    
    axios.get('http://localhost:3000/users/check_for_user',{
    })
    .then(function(response){
      if(response.data.email){
        that.setState({
          currentUser: response.data.email
        })
      } else {
        that.setState({
          currentUser: null
        })
      }
      })
      .catch(function(error){
        console.log(error);
        })
      }

      updateCurrentUser(email) {
          this.setState({
            currentUser: email
          })
      }
    //to find the nearest pickup location - UNCOMMENT BELOW 
  //  navigator.geolocation.getCurrentPosition(position => {
  //    const { latitude, longitude } = position.coords
  //  });
  


  render() {

    return (
      <div>
      {this.state.currentUser === null &&
        <Header updateCurrentUser={this.updateCurrentUser}/>
        //eventually a homepage or something here
      }
      {this.state.currentUser !== null &&
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
      }
      </div>
    );
  }
}

export default App

/*

export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/cats" component={CatsPage} >
      <Route path="/cats/:id" component={CatPage} />
    </Route>
  </Route>
);

*/