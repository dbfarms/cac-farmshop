//accessible for individual farmers to create a new farm good that belongs to them 
//
//

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFarmgoodFormData } from '../actions/FarmgoodForm';
import { editFarmgoodFormData } from '../actions/FarmgoodForm';
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
import * as farmgoodActions from '../actions/farmGoods';
import { createFarmgood } from '../actions/farmGoods'; //
import { callToEditFarmgood } from '../actions/farmGoods'
//import TextInput from '../components/common/TextInput';  
//import CheckBox from '../common/CheckBox';




class FarmgoodForm extends Component {
// the state is added for days available 
  
  constructor(props) {
    super(props);
    //this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
     //this.updateFarmgoodDaysAvailable = this.updateFarmgoodDaysAvailable.bind(this); // this has to happen but not here

    ///probably garbage below 
    //this.updateFarmgoodState = this.updateFarmgoodState.bind(this);
    //this.toggleEdit = this.toggleEdit.bind(this);
    //this.saveFarmgood - this.saveFarmgood.bind(this);
  }
/*
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

  /////////////////////// EDITING FARMGOOD FUNCTIONS BELOW

  /*
  saveFarmgood(event){
    event.preventDefault();
    this.props.actions.updateFarmgoodState((this.state.farmgood));
  }

  updateFarmgoodState(event) {
    const field = event.target.name;
   // debugger
    const farmgood = this.state.farmgood;
    farmgood[field] = event.target.value;
    return this.setState({farmgood: farmgood});

  }
  

 componentWillReceiveProps(nextProps) {
  //debugger 
  if (this.props.farmgood.id != nextProps.farmgood.id) {
    this.setState({farmgood: nextProps.farmgood});
  }
  //if (this.props.checkBoxDaysAvailable.length < nextProps.checkBoxHobbies.length) {
  //  this.setState({farmgoodDaysAvailable: nextProps.farmgoodDaysAvailable, checkBoxDaysAvailable: nextProps.checkBoxDaysAvailable});
  //})
 }
*/

  handleEditChange = event => {
      //debugger
    const { name, value } = event.target;
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.editFarmgoodFormData(currentFarmgoodFormData)
  }

  handleEditSubmit = event => {
    event.preventDefault();
    callToEditFarmgood(this.props.FarmgoodFormData)
  }



  ///////////////////////////// ADDING FARMGOOD FUNCTIONS BELOW
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
    //debugger
    const decider = this.props.isEditing 
    //debugger
    if (decider) {
      //debugger
      callToEditFarmgood(this.props.FarmgoodFormData)
    } else {
      //debugger
      createFarmgood(this.props.FarmgoodFormData)
    }
    //this.props.createFarmgood(this.props.FarmgoodFormData)
  }

  render() {
    //const boxes = this.makeCheckBoxes();
    const { name, farmer } = this.props.FarmgoodFormData; //eventually need to add category? anything else?
    return (
      <div>
        {!this.props.isEditing &&
          <div>
            Edit a Farmgood...
            <form onSubmit={this.handleEditSubmit}>
              <div>
                <label htmlFor="farmgood_name">Name of Farm Good:</label>
                <input
                  type="text"
                  placeholder={this.props.farmgood}
                  onChange={this.handleOnChange}
                  name="name"
                  value={name}
                />
              </div>
                <label htmlFor="farmgood_quantity">Farmer ID now (but eventually quantity)":</label>
              <input
                type="number"
                onChange={this.handleEditChange}
                name="farmer"
                value={farmer}
              />
            
              <button type="submit">Edit Farmgood</button>
            </form>
          </div>
        }
        {this.props.isEditing && 
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
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    FarmgoodFormData: state.FarmgoodFormData
  }
}

/*
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FarmgoodFormActions, dispatch) //farmgoodActions
  }
}
*/


export default connect(mapStateToProps, {
  updateFarmgoodFormData,
  createFarmgood
})(FarmgoodForm);

/*
export default connect(mapStateToProps, {
  updateFarmgoodFormData,
  createFarmgood
 }, mapDispatchToProps, { 
   editFarmgoodFormData, 
   callToEditFarmgood
  })(FarmgoodForm); 


*/


/* 
/// junk



const mapDispatchToProps = (dispatch) => {
  return { actions: bindActionCreators(actions, dispatch)};
}

*/