import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getOpenLineItems } from '../actions/lineitems';
import { removeLineItem } from '../actions/lineitems';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
//import Button from 'material-ui/Button';

class CartCard extends Component {

    render(){
    
    //debugger 
    var total = 0;
    return (
        <div>
            <MediaQuery query="(max-width: 635px)" >
                <div className="cartcard-small">
                    <p>{sessionStorage.name}</p>
                    
                    <label>Total: {total}</label>
                    <Link to="/checkout">
                        <button>Checkout</button>
                    </Link>
                </div>
            </MediaQuery>
            <MediaQuery query="(min-width: 636px)" >
                <div className="cartcard-med">
                    <p>{sessionStorage.name}</p>
                    <img className="CartImage"  />
                    
                    <p> need to redesign, maybe allow for adding fgs and then sign in when checking out? would mean i should make a new cart for each new session?</p>

                    <label>Total: {total}</label>
                    <Link to="/checkout">
                        <button>Checkout</button>
                    </Link>
                </div>
            </MediaQuery>
        </div>
    )}
}


const mapStateToProps = (state) => {
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems 

    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems, removeLineItem })(CartCard); // 

/*

*/
