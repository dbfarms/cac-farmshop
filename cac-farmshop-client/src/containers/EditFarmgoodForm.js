//accessible for individual farmers to create a new farm good that belongs to them 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditedFarmgoodFormData } from '../actions/FarmgoodForm';
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
import * as farmgoodActions from '../actions/farmGoods';
import { callToEditFarmgood } from '../actions/farmGoods'
import CheckBox from '../components/common/CheckBox'
import { Route } from 'react-router-dom'
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
        //value: "Category",
        category: 'Category',
        days:"daysAvailable", //THIS IS FOR RAILS PARAMS
        name1: props.farmgood.attributes.name, 
        inventory: props.farmgood.attributes.inventory,
        price: props.farmgood.attributes.price, 
        editedCategory: props.farmgood.attributes.category.title
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

  /*
  shouldComponentUpdate = (nextProps, ownProps) => {
    if (nextProps !== ownProps ) {
      return true
    } else {
      return false 
    }
  }
  //*/

  changeCategory = event => {
    //debugger 
    this.setState({
      editedCategory: event
      //value: event
    })
    const name = this.state.category 
    const value = event 
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value
    })
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
  }

  makeCheckBoxes() {
    /*    
    var newTest = this.props.daysAvailable.filter(day => { 
      this.selectedCheckboxes.add(day)
    })
    */

    var thisWeek = this.state.theWeek
    var oldDays = this.props.daysAvailable.filter(day => {
      //debugger 
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
            checkedBoxes={this.selectedCheckboxes}
            isEditing={this.props.isEditing}
            key={day[0]}
          />
        )
      })
  }

  toggleCheckbox = (event) => {
    
    if (this.selectedCheckboxes.has(event[0])) {
      this.selectedCheckboxes.delete(event[0]);
      this.days_array = this.state.days_array.filter(day => day !== event[0])
      this.setState({
        days_array: this.days_array 
      })
      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
       [this.state.days]: this.days_array
       
      })
      this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
    } else {
      this.selectedCheckboxes.add(event[0]);
      this.state.days_array.push(event[0])
      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
        [this.state.days]: this.state.days_array
      })
      this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
    }
    //event.target.ownerDocument.activeElement.attributes[1].ownerElement.labels["0"].innerText
  }

 /*   
  componentWillReceiveProps(nextProps) {
    debugger 
    const { id, value } = nextProps.search   
    if(id && this.props.editing !== nextProps.editing) {
        this.setState({
          id: id,
          
        })
    }
  }
  */
   
  handleEditChange = event => {
      
    const { name, value } = event.target;
    //debugger
    this.setState({
      [name]: value
    })
    //debugger 
    
    /* DOESN'T WORK BUT WHY?
    this.setState =({
      name: value,
    })
    */
  }

  handleEditSubmit = event => {
    event.preventDefault();
    //this.props.isEditing = false
    //this.props.history.push('/farm-goods')
    this.props.callToEditFarmgood(this.props.FarmgoodFormData)
    
  }

  
  render() {
    const boxes = this.makeCheckBoxes();
    const { name, farmer, inventory, price, category, id } = this.props.FarmgoodFormData; //eventually need to add category? anything else?
    return (
      <div className="formFarmgood">
        Edit a Farmgood...
        <form onSubmit={this.handleEditSubmit.bind(this)}>
            <div>
            <label htmlFor="farmgood_id" />
            <input type="hidden" 
                    name={this.props.farmgood.id}
                    value={this.props.farmgood.id}
                    ref={(input) => { this.actionInput = input }} 
            />
            <label htmlFor="farmgood_name">Name of Farm Good:</label>
            <input
                type="text"
                onChange={this.handleEditChange.bind(this)}
                name="name1"
                value={this.state.name1}
            />
            </div>
            {/* eventually the id will only be available for admin users to change things for farmers*/}
            <label htmlFor="farmgood_quantity">Farmer for now (but eventually quantity)":</label>
            <input
            type="number"
            onChange={this.handleEditChange.bind(this)}
            name="farmer"
            value={this.props.farmgood.attributes.farmer.id}
            />
            <br />
          <label htmlFor="farmgood_inventory">Quantity available:</label>
          <input
            type="number"
            onChange={this.handleEditChange}
            name="inventory"
            value={this.state.inventory}
          />
          <br />
          <label htmlFor="farmgood_price">Price:</label>
          <input 
            type="number"
            onChange={this.handleEditChange}
            name="price"
            value={this.state.price}
          />
          <Dropdown className="form-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {this.state.editedCategory}
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
