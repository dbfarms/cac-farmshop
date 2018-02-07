import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateCartFormData } from '../actions/cartForm'
import { createCart } from '../actions/carts';

class CartForm extends Component {

  handleOnChange = event => {
    const { name, value } = event.target;
    const currentCartFormData = Object.assign({}, this.props.cartFormData, {
      [name]: value
    })
    this.props.updateCartFormData(currentCartFormData)
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.createCart(this.props.cartFormData)
  }

  render() {

    const { user_id, status } = this.props.cartFormData;

    return (
      <div>
        Add a Cart...
        <form onSubmit={this.handleOnSubmit}>
          <div>
            <label htmlFor="user_id">User ID:</label>
            <input
              type="number"
              onChange={this.handleOnChange}
              name="user_id"
              value={user_id}
            />
          </div>
          <div>
            <input
              type="text"
              onChange={this.handleOnChange}
              name="status"
              value={status}
            />
          </div>
          <button type="submit">Add Cart</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartFormData: state.cartFormData
  }
}

export default connect(mapStateToProps, {
  updateCartFormData,
  createCart
 })(CartForm);
