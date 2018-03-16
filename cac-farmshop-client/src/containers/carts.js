import React, { Component } from 'react';
import { connect } from 'react-redux'
import CartCard from '../components/CartCard';
import CartForm from './CartForm';
import { getCart } from '../actions/carts'
import './Carts.css';

class Cart extends Component {
  constructor(props){
    super(props)
    //debugger 

    this.state = {
      user_id: sessionStorage.id, 
      user_name: sessionStorage.name,
      cart: ''
    }
  }

  componentDidMount(){
    this.props.getCart(this.state.user_id)
  }

  componentWillReceiveProps(nextProps){
    //debugger
    this.setState({
      cart: nextProps.cart[0] 
    })
    
  }

  render() {
    //debugger 
    return (
      <div>
      <div className="CartsContainer">
        <h1>Cart </h1>
        <CartCard  key={this.state.cart.id} cart={this.state.cart} />
      </div>
      </div>
   )
  }
}
//<CartCard  key={this.state.cart.id} cart={this.state.cart} />
//<CartForm />

const mapStateToProps = (state) => {
  //debugger 
  return ({
      cart: state.cart
  })
}

export default connect(mapStateToProps, { getCart })(Cart);
