//accessible for individual farmers to create a new farm good that belongs to them 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFarmgoodFormData } from '../actions/FarmgoodForm';
import { getFarmGoods } from '../actions/farmGoods'; // requests list of farmgoods from server
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
import * as farmgoodActions from '../actions/farmGoods';
import { createFarmgood } from '../actions/farmGoods'; //
import { getDays } from '../actions/days'; // requests from server
import CheckBox from '../components/common/CheckBox'
import './FarmgoodForm.css'

class NewFarmgoodForm extends Component {
// the state is added for days available 
  
  constructor(props) {
    super(props);

    this.state = {
      /*
      theWeek: { 
        Monday: false,
        Tuesday: false,
        Wednesday: false,
        Thursday: false,
        Friday: false,
        Saturday: false,
        Sunday: false,
      },
      */
      theWeek: [ 
        ["Monday", false],
        ["Tuesday", false],
        ["Wednesday", false],
        ["Thursday", false],
        ["Friday", false],
        ["Saturday", false],
        ["Sunday", false],
      ],
      days_array: []
    }
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  /*
  componentWillReceiveProps(nextProps){
    this.setState({
      days_array: nextProps.days.data
      //days_array: nextProps.days.data
    })
  }
  */

  toggleCheckbox = label => {
    //const target = label.target;
    //const value = target.type === 'checkbox' ? target.checked : target.value;
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
       // [name]: value
       
      })
      this.props.updateFarmgoodFormData(currentFarmgoodFormData)
    } else {
      this.selectedCheckboxes.add(label);
      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
        //[name]: value
      })
      this.props.updateFarmgoodFormData(currentFarmgoodFormData)
    }
    //event.target.ownerDocument.activeElement.attributes[1].ownerElement.labels["0"].innerText
  }
  
  makeCheckBoxes() {
    return this.state.theWeek.map(keyName => { 
      return (
          <CheckBox 
            item={keyName[0]} 
            handleChange={this.toggleCheckbox.bind(this)} 
            value={keyName[0]} 
            //key={dayAvailable.id}
          />
        )
      })
  }


/*
  //debugger

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

  handleOnChange = event => {
      //debugger
    const { name, value } = event.target;
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.updateFarmgoodFormData(currentFarmgoodFormData)
  } //not necessary for this to be redux

  handleOnSubmit = event => {
    event.preventDefault();
    this.props.createFarmgood(this.props.FarmgoodFormData)
    
  }


  render() {
    const boxes = this.makeCheckBoxes();
    const { name, farmer, quantity, theWeek } = this.props.FarmgoodFormData; //eventually need to add category? anything else?
    return (
      <div className="formFarmgood">
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
          <label htmlFor="farmgood_quantity">Farmer ID now (but eventually this won't exist)":</label>
          <input
            type="number"
            onChange={this.handleOnChange}
            name="farmer"
            value={farmer}
          />
          <label htmlFor="farmgood_quantity">Quantity available":</label>
          <input
            type="number"
            onChange={this.handleOnChange}
            name="quantity"
            value={quantity}
          />
          {this.makeCheckBoxes()}
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

/*
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(FarmgoodFormActions, dispatch) //farmgoodActions
  }
}
*/


export default connect(mapStateToProps, {
  updateFarmgoodFormData,
  createFarmgood,
  getFarmGoods,
  getDays
})(NewFarmgoodForm);

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

*/