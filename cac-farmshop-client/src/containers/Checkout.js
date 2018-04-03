import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartCard from '../components/CartCard';
import { getOpenLineItems } from '../actions/lineitems';
import { checkingOutNow } from '../actions/orders';

class Checkout extends Component {
  constructor(props){
    super(props)
    //debugger 

    this.state = {
      user_id: sessionStorage.id, 
      user_name: sessionStorage.name,
      lineitems: ''
    }
  }

  componentWillMount(){
    this.props.getOpenLineItems()
  }

  componentWillReceiveProps(nextProps){
    //debugger
    this.setState({
      openLineitems: nextProps.openLineitems,
      cart: nextProps.cart 
      //oldLineItems: nextProps.allLineItems 
    })
  }

  checkingOut(){
    const lineitems = this.props.openLineitems
    //debugger 
    if (lineitems.length === 0) {
      alert('add items to cart!')
    } else {
      const cartID = lineitems[0].attributes["cart-id"]
      //debugger 
      const customerUserID = lineitems[0].attributes.cart.customer_user_id
      //debugger 
      this.props.checkingOutNow(customerUserID, cartID)
    }
  }

  render() {
    //debugger 
    return (
      <div>
          <button onClick={() => this.checkingOut()}>
            this button to checkout thanks            
          </button>

          <p> eventually this will have checkout options like payment etc</p>
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  return ({
    cart: state.cart,
    openLineitems: state.openLineitems 

  })
}

export default connect(mapStateToProps, { getOpenLineItems, checkingOutNow })(Checkout);
