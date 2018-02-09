//accessible for individual farmers to create a new farm good that belongs to them 

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateFarmgoodFormData } from '../actions/FarmgoodForm';
import { createFarmgood } from '../actions/farmGoods'; //

class FarmgoodForm extends Component {

  handleOnChange = event => {
    const { name, value } = event.target;
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.updateFarmgoodFormData(currentFarmgoodFormData)
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.createFarmgood(this.props.FarmgoodFormData)
  }

  render() {

    const { user_id, status } = this.props.FarmgoodFormData;

    return (
      <div>
        Add a Farmgood...
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
          <button type="submit">Add Farmgood</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    FarmgoodFormData: state.FarmgoodFormData
  }
}

export default connect(mapStateToProps, {
  updateFarmgoodFormData,
  createFarmgood
 })(FarmgoodForm);
