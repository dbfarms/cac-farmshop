import React, { Component } from 'react';
import CartCard from '../components/CartCard';
import CartForm from './CartForm';
import './Carts.css';

class Carts extends Component {

  render() {
    return (
    <div className="CartsContainer">
      <h1>Carts </h1>
      {this.props.carts.map(cart => <CartCard  key={cart.id} cart={cart} />)}
      <CartForm />
    </div>
   )
  }
}


 export default Carts;
