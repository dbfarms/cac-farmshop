import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import './App.css';
import FarmGoods from './FarmGoods';
//import FarmersPage from './FarmersPage';
//import FarmerShow from './FarmerShow';
import { getFarmGoods } from '../actions/farmGoods';
import Carts from './carts';
import NewFarmgoodForm from './NewFarmgoodForm';
import EditFarmgoodForm from './EditFarmgoodForm';
import LogInPage from '../components/LogInPage';
import SignUpPage from '../components/SignUp';
import FarmGoodCard from '../components/farmGoodCard'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Authorization from './authorization';
import Home from './Home';
import Header from '../components/common/Header';
//import { getUser } from '../actions/sessionActions';
import FarmerRoutes from './farmerRoutes';
import AdminRoutes from './adminRoutes';
import CustomerRoutes from './customerRoutes';
import DefaultRoutes from './defaultRoutes';
import '../index.css'

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
      auth: false,
      slide: 0,  // How much should the Navbar slide up or down
      lastScrollY: 0,  // Keep track of current position in state
    }
    //this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }
  
    //to find the nearest pickup location - UNCOMMENT BELOW 
  //  navigator.geolocation.getCurrentPosition(position => {
  //    const { latitude, longitude } = position.coords
  //  });

  componentWillMount(){
    this.props.getFarmGoods();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { lastScrollY } = this.state; 
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY) {
      this.setState({ slide: '-48px' });
    } else {
      this.setState({ slide: '0px' });
    }
    this.setState({ lastScrollY: currentScrollY });

    console.log(this.state.slide)
  };

  componentWillReceiveProps(nextProps){
    this.setState({
      farmGoods_array: nextProps.farmGoods.data
    })
  }

  requireAuth(nextState, replace) {  
    debugger
    if (!sessionStorage.jwt) {
      return <Redirect to='/login' />
      //state: { nextPathname: nextState.location.pathname } //********************** for when you want to go back to this page
    }
  }

  determineUser() {
    //debugger 
    //makes sure the jwt value is undefined if logging out via logout page 
    if (sessionStorage.length <= 1) {
      sessionStorage.jwt = "undefined" 
    }
  }

  render() {
    this.determineUser(); //this just catches a bug that would occur when creating new users but may not be needed anymore who knows?
    return (
      <div className="masthead classic-header justify logo-center widgets dividers surround line-decoration dt-parent-menu-clickable show-device-logo show-mobile-logo masthead-mobile" role="banner">

      <div className="top-bar full-width-line">
        <div className="left-widgets mini-widgets"></div>					
      </div>



        <div className="top-bar full-width-line">
        <div className="cac-logo-here">
          <a href="http://www.chesteragcenter.com" align="middle"><img src="https://static1.squarespace.com/static/541b4499e4b09b50ed990ebc/54612904e4b08f1a465c54ca/5ad77dea8a922deac7191197/1524071917324/Chester-Agricultural-Center-220.jpg?format=750w" alt="logo" align="middle"/></a>
      </div>
          {sessionStorage.jwt === "undefined" &&
            <div>
            <h3>Welcome VISITOR</h3>
              <DefaultRoutes /> 
            </div>
          }
          {sessionStorage.role === "customer" &&
            <div>
                
                <h3>Welcome {sessionStorage.name}</h3>
                <CustomerRoutes />
            </div>
          }
          {sessionStorage.role === "admin" &&
            <div>
            <h3>auth level is {sessionStorage.role}</h3>
            <AdminRoutes />
            </div>
          }
          {sessionStorage.role === "farmer" &&
            <div>
            <h3>Welcome {sessionStorage.name} / auth level is {sessionStorage.role}</h3>
            <FarmerRoutes />
            </div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  //debugger 
  return ({
      farmGoods: state.farmGoods,
      logged_in: state.session, //changing this to check in header.js for sessionStorage that isn't undefined
      //users: state.users // i suspect i no longer need this line... >
  })
}

export default connect(mapStateToProps, { getFarmGoods /*, getUser */ })(App); // 


/*

<Header 
            style={{
            transform: `translate(0, ${this.state.slide})`,
            transition: 'transform 90ms linear',
          }}/>

/////////////////////

<BrowserRouter >
        <div className="background-here">
          <Header />
          <Route path="/login" component={LogInPage} />
          <Route path="/signup" component={SignUpPage} />
          
          <Route exact path="/home" 
                 component={Authorization(Home, ['admin', this.props.logged_in, sessionStorage.jwt])} />
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
component={NewFarmgoodForm} 

*/