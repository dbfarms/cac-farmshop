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

    this.makeCheckBoxes = this.makeCheckBoxes.bind(this);
     //this.updateFarmgoodDaysAvailable = this.updateFarmgoodDaysAvailable.bind(this); // this has to happen but not here

    ///probably garbage below 
    //this.updateFarmgoodState = this.updateFarmgoodState.bind(this);
    //this.saveFarmgood - this.saveFarmgood.bind(this);
  }


  onDayAvailableChange(){
    console.log('i am here')
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
            //handleChange={this.onDayAvailableChange} 
            //key={dayAvailable.id}
          />
        )
      })
  }


  //the below isn't used yet and may be an unnecessary addition
  editCheckBoxes() {
    return this.props.farmGood.daysAvailable.map(dayAvailable => {
      return (
        <CheckBox 
          item={dayAvailable} 
          handleChange={this.props.onDayAvailableChange} 
          key={dayAvailable.id}/>
      )
    })
  }


  //moved this from containers/FarmGoods
  updateFarmgoodDaysAvailable(event) {
    const farmgood = this.state.farmgood;
    const daysAvailableId = event.target.value;
    const dayAvailable = this.state.checkBoxDaysAvailable.filter(day => day.id === daysAvailableId)[0];
    const checked = !dayAvailable.checked;
    dayAvailable['checked'] = !dayAvailable.checked;
    if (checked) {
      farmgood.daysAvailable_ids.push(dayAvailable.id);
    } else {  
      farmgood.daysAvailable_ids.splice(farmgood.daysAvailable_ids.indexOf(dayAvailable.id));
    }
    this.setState({dayAvailable: dayAvailable});
  }

/*
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
    ///NOT HITTING FUNCTION BELOW, WHY?
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
  updateFarmgoodFormData,
  createFarmgood
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