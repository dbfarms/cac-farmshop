//accessible for individual farmers to create a new farm good that belongs to them 

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateFarmgoodFormData } from '../actions/FarmgoodForm';
import { createFarmgood } from '../actions/farmGoods'; //
//import TextInput from '../common/TextInput';  
//import CheckBox from '../common/CheckBox';


class FarmgoodForm extends Component {
/* for days available 

  constructor(props) {
    super(props);
    this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
  }

  makeCheckBoxes() {
    return this.props.daysAvailable.map(dayAvailable => {
      return (
        <CheckBox 
          item={dayAvailable} 
          handleChange={this.props.onDayAvailableChange} 
          key={dayAvailable.id}/>
      )
    })
  }

*/
  //debugger

  handleOnChange = event => {
      //debugger
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
    //const boxes = this.makeCheckBoxes();
    //debugger 
    const { name, farmer } = this.props.FarmgoodFormData; //eventually need to add category? anything else?

    return (
      <div>
        Add a Farmgood...
        <form onSubmit={this.handleOnSubmit}>
          <div>
            <label htmlFor="farmgood_name">Name of Farm Good:</label>
            <input
              type="text"
              onChange={this.handleOnChange}
              name="name"
              value={name}
            />
          </div>
            <label htmlFor="farmgood_quantity">Farmer ID now (but eventually quantity)":</label>
          <input
            type="number"
            onChange={this.handleOnChange}
            name="farmer"
            value={farmer}
          />
         
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
