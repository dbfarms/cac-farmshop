//accessible for individual farmers to create a new farm good that belongs to them 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditedFarmgoodFormData } from '../actions/FarmgoodForm';
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
import * as farmgoodActions from '../actions/farmGoods';
import { callToEditFarmgood } from '../actions/farmGoods'
import CheckBox from '../components/common/CheckBox'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class EditFarmgoodForm extends Component {
// the state is added for days available 
  
  constructor(props) {
    super(props)

    this.changeCategory = this.changeCategory.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
        theWeek: [ 
          ["Monday", false],
          ["Tuesday", false],
          ["Wednesday", false],
          ["Thursday", false],
          ["Friday", false],
          ["Saturday", false],
          ["Sunday", false],
        ],
        days_array: [],
        dropdownOpen: false,
        value: "Category",
        category: 'Category',
        days:"daysAvailable", //THIS IS FOR RAILS PARAMS
      }
  }

  toggle(){
    this.setState({
        dropdownOpen: !this.state.dropdownOpen,
    });
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  changeCategory = event => {
    this.setState({
      category: event,
      value: event
    })
    const name = this.state.category 
    const value = event 
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
  }

  makeCheckBoxes() {
    var thisWeek = this.state.theWeek
    var oldDays = this.props.daysAvailable.filter(day => {
        for (let i = 0; i< thisWeek.length; i++) {
            if (day.name === thisWeek[i][0]) {
                thisWeek[i][1] = true 
            }
        }
    })
   
    return thisWeek.map(day => {
      return (
          <CheckBox 
            item={day} 
            handleChange={this.toggleCheckbox.bind(this)} 
            value={day}
            //key={dayAvailable.id}
          />
        )
      })
  }

  toggleCheckbox = (event) => {
    if (this.selectedCheckboxes.has(event)) {
      this.selectedCheckboxes.delete(event);
      this.days_array = this.state.days_array.filter(day => day !== event)
      this.setState({
        days_array: this.days_array 
      })
      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
       [this.state.days]: this.days_array
       
      })
      this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
    } else {
      this.selectedCheckboxes.add(event);
      this.state.days_array.push(event)
      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
        [this.state.days]: this.state.days_array
      })
      this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
    }
    //event.target.ownerDocument.activeElement.attributes[1].ownerElement.labels["0"].innerText
  }


  handleEditChange = event => {
      //debugger
    const { name, value } = event.target;
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
  }

  handleEditSubmit = event => {
    event.preventDefault();
    //this.props.isEditing = false
    this.props.callToEditFarmgood(this.props.FarmgoodFormData)
  }

  
  render() {
    const boxes = this.makeCheckBoxes();
    const { name, farmer, inventory, price, category } = this.props.FarmgoodFormData; //eventually need to add category? anything else?
    return (
      <div className="formFarmgood">
        Edit a Farmgood...
        <form onSubmit={this.handleEditSubmit}>
            <div>
            <label htmlFor="farmgood_name">Name of Farm Good:</label>
            <input
                type="text"
                //placeholder={this.props.farmgood.attributes.name}
                onChange={this.handleEditChange}
                name="name"
                value={this.props.farmgood.attributes.name}
            />
            </div>
            {/* eventually the id will only be available for admin users to change things for farmers*/}
            <label htmlFor="farmgood_quantity">Farmer ID now (but eventually quantity)":</label>
            <input
            type="number"
            onChange={this.handleEditChange}
            name="farmer"
            value={this.props.farmgood.attributes.farmer.id}
            />
            <br />
          <label htmlFor="farmgood_inventory">Quantity available:</label>
          <input
            type="number"
            onChange={this.handleEditChange}
            name="inventory"
            value={this.props.farmgood.attributes.inventory}
          />
          <br />
          <label htmlFor="farmgood_price">Price:</label>
          <input 
            type="number"
            onChange={this.handleEditChange}
            name="price"
            value={this.props.farmgood.attributes.price}
          />
          <Dropdown className="form-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {this.props.farmgood.attributes.category.title}
            </DropdownToggle>
            <DropdownMenu value="category" >
                <DropdownItem header>Category</DropdownItem>
                <DropdownItem onClick={() => {
                    this.changeCategory('Vegetables/Fruit')
                    }}>Fruit & Vegetables</DropdownItem>
                <DropdownItem onClick={() => {
                    this.changeCategory('Meat')
                    }}>Meat</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.changeCategory('Dairy')
                    }}>Dairy</DropdownItem>
                 <DropdownItem onClick={() => {
                    this.changeCategory('Eggs')
                    }}>Eggs</DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
  callToEditFarmgood,
  //updateFarmgoodFormData,
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