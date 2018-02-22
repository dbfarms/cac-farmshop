import React, { Component } from 'react';
import Navbar from '../components/Navbar'
//difference between react and react, component??
import { BrowserRouter, Switch, Route, Router } from 'react-router-dom';
//import { connect } from 'react-redux'
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
      //days_array: nextProps.days.data
    })
  }


  render() {

    return (
      <div>
      
      {this.state.currentUser === null &&
      <BrowserRouter >
        <div className="background-here">
        
          <Navbar />
          <Route path="/login" component={LogInPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route exact path="/" render={() => <div>Home For Now</div>} />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmGoods} />
          <Route exact path="/farm-goods/new" component={NewFarmgoodForm} />
          <Route exact path="/farm-goods/:id/edit" component={EditFarmgoodForm} />
          <Route path ="/farm-goods/:id" component={FarmGoodCard} />
          <Route exact path="/cart" component={Carts} />
          <Route path="*" render={() => <div></div>} />
        </div>
      </BrowserRouter >
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
      farmGoods: state.farmGoods,
  })
}

export default connect(mapStateToProps, { getFarmGoods })(App); // 


/*

<Route path="/login" component={LogInPage} />
          <Route exact path="/" render={() => <div>Home For Now</div>} />
          <Route exact path='/farmers' component={FarmersPage} />
          <Route exact path="/farm-goods" component={FarmGoods} />
          <Route exact path="/farm-goods/new" component={NewFarmgoodForm} />
          <Route exact path="/cart" component={Carts} />
          <Route path="*" render={() => <div>Page Not Found</div>} />


//Vue.use(axios)
  
  /*
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


export default (  
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/cats" component={CatsPage} >
      <Route path="/cats/:id" component={CatPage} />
    </Route>
  </Route>
);

*/