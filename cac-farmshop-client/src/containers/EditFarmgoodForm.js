//accessible for individual farmers to create a new farm good that belongs to them 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditedFarmgoodFormData } from '../actions/FarmgoodForm';
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
import * as farmgoodActions from '../actions/farmGoods';
import { callToEditFarmgood } from '../actions/farmGoods'
import EditFarmGoodCard from '../components/EditFarmGoodCard';
import CheckBox from '../components/common/CheckBox'
import { Route } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { deleteFarmGoods } from '../actions/farmGoods';
import { Link } from 'react-router-dom';

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
        category: 'category',
        firstDayPush: 0,
        days:"daysAvailable", //THIS IS FOR RAILS PARAMS / FARMGOODFORMDATA
        initialFarmgood: {
          id: props.location.farmGood.id,
          name: props.location.farmGood.attributes.name, 
          inventory: props.location.farmGood.attributes.inventory,
          price: props.location.farmGood.attributes.price, 
          category: props.location.farmGood.attributes.category.title,
          daysAvailable: this.props.location.farmGood.relationships.days.data
        },
      }
  }

  toggle(){
    this.setState({
        dropdownOpen: !this.state.dropdownOpen,
    });
  }

  componentWillMount = () => {
    //debugger
    let days_array = []
    this.selectedCheckboxes = new Set();
    this.state.initialFarmgood.daysAvailable.map(day => {
      this.selectedCheckboxes.add(day.name);
      days_array.push(day.name)
    })
    
    //console.log(days_array)
    this.props.updateEditedFarmgoodFormData(this.state.initialFarmgood)

    const currentFarmgoodFormData = Object.assign({}, this.state.initialFarmgood, {
      days_array: days_array 
     })
     this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)


  }

  changeCategory = event => {
    //debugger 
    this.setState({
      initialFarmgood: {
        category: event
      }
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
    var thisWeek = this.state.theWeek
    var oldDays = this.props.location.farmGood.relationships.days.data.filter(day => {
      for (let i = 0; i< thisWeek.length; i++) {
          if (day.name === thisWeek[i][0]) {
            thisWeek[i][1] = true 
          } else {
            thisWeek[i][1] = false 
          }
      }
    })
    

    /*
    thisWeek.map(day => { 
      if (day[1] === true ) {
        this.selectedCheckBoxes.add(day[0])
      }
    })
    */

   //debugger 
    return thisWeek.map(day => {
      return (
          <CheckBox 
            item={day} 
            handleChange={this.toggleCheckbox.bind(this)} 
            value={day}
            checkedBoxes={this.selectedCheckboxes}
            isEditing={true} 
            key={day[0]}
          />
        )
      }) 
  }

  toggleCheckbox = (event) => {
    
    if (this.selectedCheckboxes.has(event[0])) {
      this.selectedCheckboxes.delete(event[0]);
      this.days_array = this.props.FarmgoodFormData.days_array.filter(day => day !== event[0])
      
      //is the below even necessary?
      this.setState({
        initialFarmgood: {
          days_array: this.days_array
        }
      })

      const indexOfDay = this.state.theWeek.map((day, index) => {
        if (event[0] === day[0]) {
          return index 
        }
      })

      /*
      let updatedWeek = this.state.theWeek.slice(); 
      updatedWeek[indexOfDay] = false ;
      this.setState({theWeek: updatedWeek});
      */
      
      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
       //[this.state.days]: this.days_array
       daysAvailable: this.selectedCheckboxes,
       days_array: this.days_array 
       
      })
      this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
    } else {
      
      this.selectedCheckboxes.add(event[0]);
      

      /*
      this.setState({
        initialFarmgood: {
          days_array: this.state.initialFarmgood.daysAvailable.concat(event[0])
        }
      })
      */
      //this.state.days_array.push(event[0])
      this.days_array = this.props.FarmgoodFormData.days_array.concat(event[0])
      
      /*
      const updatedWeek = this.state.theWeek.daysAvailable.concat(event[0])

      this.setState({
        theWeek: updatedWeek 
      })
      */

      const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
        daysAvailable: this.selectedCheckboxes, //[this.state.days]
        days_array: this.days_array
      })
      this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
    }
  }

   
  handleEditChange = event => {

    const { name, value } = event.target;
    //const id = this.props.location.farmGood.id
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value //, 
      //id: id 
    })
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
  }

  handleEditSubmit = event => {
    event.preventDefault();
    
    this.props.callToEditFarmgood(this.props.FarmgoodFormData, this.props.history)
  }

  handleDelete(farmGood){
    this.props.deleteFarmGoods(farmGood, this.props.history);
    alert('deleting')
    
  }

  handleCancel = () =>{
    this.props.history.push('/farm-goods') 
  }

  setInitialDays = () => {
    
    this.setState({
      days_array: this.selectedCheckboxes,
      firstDayPush: 1
    })
    this.props.updateEditedFarmgoodFormData(this.state.initialFarmgood)


    /*
      params["farmGood"]["daysAvailable"]
[<ActionController::Parameters {"id"=>2, "name"=>"Tuesday"} permitted: false>]

    */
    
  }

  
  render() {
    //<EditFarmGoodCard farmGood={this.props.location.farmGood}/> //THIS MIGHT REPLACE CURRENTLY USED FARMGOODCARD ONE DAY I DUNNO
    if (this.state.firstDayPush === 0 ) {
     //this.setInitialDays() 
    }


    const boxes = this.makeCheckBoxes();
    const { name, farmer, inventory, price, category, id } = this.props.FarmgoodFormData; //eventually need to add category? anything else?
    return (
      <div className="formFarmgood">
        
        Edit a Farmgood...
        <form onSubmit={this.handleEditSubmit.bind(this)}>
            <div>
            <label htmlFor="farmgood_id" />
            <input type="hidden" 
                    name={this.props.location.farmGood.id}
                    value={this.props.location.farmGood.id}
                    ref={(input) => { this.actionInput = input }} 
            />
            <label htmlFor="farmgood_name">Name of Farm Good:</label>
            <input
                type="text"
                onChange={this.handleEditChange.bind(this)}
                name="name"
                value={name}
            />
            </div>
            {/* eventually the id will only be available for admin users to change things for farmers*/}
            <label htmlFor="farmgood_quantity">Farmer for now (but eventually quantity)":</label>
            <input
            type="number"
            onChange={this.handleEditChange.bind(this)}
            name="farmer"
            value={this.props.location.farmGood.attributes.farmer.id}
            />
            <br />
          <label htmlFor="farmgood_inventory">Quantity available:</label>
          <input
            type="number"
            onChange={this.handleEditChange}
            name="inventory"
            value={inventory}
          />
          <br />
          <label htmlFor="farmgood_price">Price:</label>
          <input 
            type="number"
            onChange={this.handleEditChange}
            name="price"
            value={price}
          />
          <Dropdown className="form-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {category}
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
        <button name="remove item" onClick={() => this.handleDelete(this.props.location.farmGood) }>remove item</button> 
        <button name="cancel edit" onClick={() => this.handleCancel() }>cancel edit</button>
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
  deleteFarmGoods,
  //updateFarmgoodFormData,
})(EditFarmgoodForm);
