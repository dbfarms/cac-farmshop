import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Router, Redirect } from 'react-router-dom';
import './App.css';
import FarmGoods from './FarmGoods';
//import FarmersPage from './FarmersPage';
//import FarmerShow from './FarmerShow';
import { getFarmGoods } from '../actions/farmGoods';
import { getAll } from '../actions/farmGoods';
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
import 'react-sticky-header/styles.css';
import StickyHeader from 'react-sticky-header';
import '../index.css'
import { getOpenLineItems } from '../actions/lineitems';

class App extends Component {
  constructor() {
    super()

    this.state = {
      currentUser: null,
      auth: false,
      openLineitems: []
    }
  }
  
    //to find the nearest pickup location - UNCOMMENT BELOW 
  //  navigator.geolocation.getCurrentPosition(position => {
  //    const { latitude, longitude } = position.coords
  //  });

  componentWillMount(){
   // if (sessionStorage.id != undefined) {
    //  this.props.getAll();
    //} else {
      this.props.getFarmGoods();
      this.props.getOpenLineItems(sessionStorage.id);

    //}
  }
    //

  componentWillReceiveProps(nextProps){
    //debugger 
    //console.log(nextProps.openLineitems)
    this.setState({
      farmGoods_array: nextProps.farmGoods.data,
      openLineitems: nextProps.openLineitems
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
    
    //className="post-template-default single single-post postid-15038 single-format-standard no-comments title-off scale-on-hover small-hover-icons click-effect-on-img dt-responsive-on overlay-cursor-on accent-gradient srcset-enabled btn-material custom-btn-color custom-btn-hover-color outline-element-decoration accent-bullets bold-icons phantom-fade phantom-line-decoration phantom-custom-logo-on sticky-mobile-header top-header first-switch-logo-left first-switch-menu-right second-switch-logo-left second-switch-menu-right right-mobile-menu layzr-loading-on popup-message-style wpb-js-composer js-comp-ver-5.1.1 vc_responsive is-webkit no-mobile phantom-off closed-overlay-mobile-header"
    return (
      <div >
          <div className="headerspacer"></div>
          <StickyHeader header={<Header openLineitems={this.state.openLineitems}/>}>
          </StickyHeader>
            {sessionStorage.jwt === "undefined" &&
              <div>
                <DefaultRoutes /> 
              </div>
            }
            {sessionStorage.role === "customer" &&
              <div>
                  <CustomerRoutes />
              </div>
            }
            {sessionStorage.role === "admin" &&
              <div>
                <AdminRoutes />
              </div>
            }
            {sessionStorage.role === "farmer" &&
              <div>
                <FarmerRoutes />
              </div>
            }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state)
  return ({
      farmGoods: state.farmGoods,
      logged_in: state.session, //changing this to check in header.js for sessionStorage that isn't undefined
      openLineitems: state.openLineitems
      //users: state.users // i suspect i no longer need this line... >
  })
}

export default connect(mapStateToProps, { getFarmGoods, getOpenLineItems, /* getAll, getUser */ })(App); // 


/*

<Header 
            style={{
            transform: `translate(0, ${this.state.slide})`,
            transition: 'transform 90ms linear',
          }}/>

/////////////////////

*/