import React, { Component } from 'react';
import { connect } from 'react-redux'
import CartCard from '../components/CartCard';
import CartForm from './CartForm';
import { getCarts } from '../actions/carts'
import './Carts.css';

class Carts extends Component {

  componentDidMount(){
    this.props.getCarts()
  }

  render() {
    return (
      <div>
      <div className="CartsContainer">
        <h1>Carts </h1>
        {this.props.carts.map(cart => <CartCard  key={cart.id} cart={cart} />)}
        <CartForm />
      </div>
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  return ({
      carts: state.carts
  })
}

export default connect(mapStateToProps, { getCarts })(Carts);
