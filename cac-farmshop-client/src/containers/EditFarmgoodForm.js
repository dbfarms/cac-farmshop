//accessible for individual farmers to create a new farm good that belongs to them 
//
//

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditedFarmgoodFormData } from '../actions/FarmgoodForm';
import { updateFarmgoodFormData } from '../actions/FarmgoodForm';
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
import * as farmgoodActions from '../actions/farmGoods';
import { callToEditFarmgood } from '../actions/farmGoods'
import CheckBox from '../components/common/CheckBox'
//import TextInput from '../components/common/TextInput';  

class EditFarmgoodForm extends Component {
// the state is added for days available 
  
  constructor(props) {
    super(props)

    this.state = {
        theWeek: {
          Monday: false,
          Tuesday: false,
          Wednesday: false,
          Thursday: false,
          Friday: false,
          Saturday: false,
          Sunday: false,
        }
      }
  }


  makeCheckBoxes() {
    var oldDays = Object.entries(this.state.theWeek).map(function(keyName, keyIndex) { return keyName })

    var test = this.props.daysAvailable.filter(day => {
        for (let i = 0; i< oldDays.length; i++) {
            if (day.name === oldDays[i][0]) {
                oldDays[i][1] = true 
            }
        }
    })
   
    return oldDays.map(day => {
      return (
          <CheckBox 
            item={day} 
            handleChange={this.updateFarmgoodDaysAvailable.bind(this)} 
            //key={dayAvailable.id}
          />
        )
      })
  }

  //moved this from containers/FarmGoods
  updateFarmgoodDaysAvailable = event => {
    const farmgood = this.props.farmgood;
    const daysAvailableId = event.target.value;
    
  }

/*
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
  if (this.props.checkBoxDaysAvailable.length < nextProps.checkBoxHobbies.length) {
    this.setState({farmgoodDaysAvailable: nextProps.farmgoodDaysAvailable, checkBoxDaysAvailable: nextProps.checkBoxDaysAvailable});
  }
 }

   handleOnChange = event => {
      //debugger
    const { name, value } = event.target;
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.updateFarmgoodFormData(currentFarmgoodFormData)
  } //not necessary for this to be redux

 */

  handleEditChange = event => {
      //debugger
    const { name, value } = event.target;
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.updateFarmgoodFormData(currentFarmgoodFormData)
  }

  handleEditSubmit = event => {
    event.preventDefault();
    this.props.callToEditFarmgood(this.props.FarmgoodFormData)
  }

  
  render() {
    const boxes = this.makeCheckBoxes();
    const { name, farmer } = this.props.FarmgoodFormData; //eventually need to add category? anything else?
    return (
      <div>
        Edit a Farmgood...
        <form onSubmit={this.handleEditSubmit}>
            <div>
            <label htmlFor="farmgood_name">Name of Farm Good:</label>
            <input
                type="text"
                placeholder={this.props.farmgood}
                onChange={this.handleEditChange}
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
            {boxes}
            
            <button type="submit">Edit Farmgood</button>
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

/*
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FarmgoodFormActions, dispatch) //farmgoodActions
  }
}
*/


export default connect(mapStateToProps, {
  updateEditedFarmgoodFormData,
  updateFarmgoodFormData,
})(EditFarmgoodForm);

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



{Object.keys(this.state.daysAvailable).map(function(keyName, keyIndex) {
                <div>
                {this.makeCheckBoxes(keyName, keyIndex)}
                </div>
                })
              }

*/