import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditedFarmgoodFormData } from '../actions/FarmgoodForm';
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
import * as farmgoodActions from '../actions/farmGoods';
import { getSingleFarmGood } from '../actions/farmGoods';
import { callToEditFarmgood } from '../actions/farmGoods';
import EditFarmGoodCard from '../components/EditFarmGoodCard';
import CheckBox from '../components/common/CheckBox'
import { Route } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { deleteFarmGoods } from '../actions/farmGoods';
import { Link } from 'react-router-dom';

class AdminEditFarmgoodForm extends Component {
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
          id: 0, //props.location.farmGood.id,
          name: '', //props.location.farmGood.attributes.name, 
          inventory: '', //props.location.farmGood.attributes.inventory,
          price: '', //props.location.farmGood.attributes.price, 
          category: '', //props.location.farmGood.attributes.category.title,
          daysAvailable: []//this.props.location.farmGood.relationships.days.data
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
  console.log("compwillmount")
  //console.log(this.state.initialFarmgood)
  const routeArray = document.location.href.split('/');
  const farmgoodID = Number(routeArray[routeArray.length - 2])
  const farmerID = Number(routeArray[routeArray.length - 4])
  //debugger 
  this.props.getSingleFarmGood(farmerID, farmgoodID);

  let days_array = []
  this.selectedCheckboxes = new Set();
  this.state.initialFarmgood.daysAvailable.map(day => {
    this.selectedCheckboxes.add(day.name);
    days_array.push(day.name)
  })
  
  //console.log(days_array)
  //debugger 
  this.props.updateEditedFarmgoodFormData(this.state.initialFarmgood)

  const currentFarmgoodFormData = Object.assign({}, this.state.initialFarmgood, {
    days_array: days_array 
   })
   this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
}

componentWillReceiveProps(nextProps){
  //debugger 
  if (nextProps.initialFarmgood != undefined && nextProps.initialFarmgood.id != this.state.initialFarmgood.id) {
    //debugger 
    this.setState({
      initialFarmgood: {
        id: Number(nextProps.initialFarmgood.id),
        name: nextProps.initialFarmgood.attributes.name,
        inventory: nextProps.initialFarmgood.attributes.inventory,
        price: nextProps.initialFarmgood.attributes.price,
        category: nextProps.initialFarmgood.attributes.category,
        daysAvailable: nextProps.initialFarmgood.relationships.days.data, 
        farmer: nextProps.initialFarmgood.attributes.farmer.id

      }
    })
  } 

  //debugger 
  //if (this.state.initialFarmgood.id != 0) {
    //// doing this to set initial values in form, but right now it's breaking
    /// 
    //debugger
    console.log("updating form in willreceiveprops")
    //////////LEFT OFF HERE, NOT SURE WHERE TO PUT DAYS_ARRAY
    let days_array = []
    this.selectedCheckboxes = new Set();
    this.state.initialFarmgood.daysAvailable.map(day => {
      this.selectedCheckboxes.add(day.name);
      days_array.push(day.name)
    })

    //debugger 
    if (this.state.FarmgoodFormData) {
      debugger 
    }
    //debugger 
    ///////////////////////////////////////////////////////
        
   ////
  //}
  //var noChanges = true; 

  //this.state.initialFarmgood

  /*
  this.props.updateEditedFarmgoodFormData(this.state.initialFarmgood)

    const currentFarmgoodFormData = Object.assign({}, this.state.initialFarmgood, {
      days_array: days_array 
    })
    //debugger 

    console.log(currentFarmgoodFormData)
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
    */
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
  //debugger 
  if (this.state.initialFarmgood.relationships != undefined ) {
    var oldDays = this.state.initialFarmgood.relationships.days.data.filter(day => {
      for (let i = 0; i< thisWeek.length; i++) {
          if (day.name === thisWeek[i][0]) {
            thisWeek[i][1] = true 
          } else {
            thisWeek[i][1] = false 
          }
      }
    })
  }
  

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
  
  let days_array
  debugger 
  if (this.props.FarmgoodFormData.days_array == undefined) {
    days_array = this.props.FarmgoodFormData.relationships["days-available"].data  
  } else {
    days_array = this.props.FarmgoodFormData.days_array 
  }
  
  //debugger 

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

    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
     daysAvailable: this.selectedCheckboxes,
     days_array: this.days_array 
     
    })
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
  } else {
    
    this.selectedCheckboxes.add(event[0]);
    
    //NEED TO CREATED DAYSAVAILABLE AND DAYS_ARRAY FOR INITIAL FARMGOOD BUT IS THIS BEST PLACE FOR IT?
    /* 
    if (this.props.FarmgoodFormData.days_array == undefined ) {
      let currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
        daysAvailable: [],
        days_array: []
      })
    }
    */
    //debugger 
    days_array = days_array.concat(event[0]) //this.props.FarmgoodFormData.days_array.concat(event[0])
    
    //debugger 
    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      daysAvailable: this.selectedCheckboxes, //[this.state.days]
      days_array: days_array
    })
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
  }
}

 
handleEditChange = event => {

  const { name, value } = event.target;
  //const id = this.props.location.farmGood.id

  //debugger 
  let currentFarmgoodFormData 
  if (this.props.FarmgoodFormData.attributes == undefined ) {
    currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
      [name]: value //, 
      //id: id 
    })
  } else {
    currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData.attributes, {
      [name]: value //, 
      //id: id 
    })
  }

  //debugger 

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
  this.props.history.push('/farmgoods') 
}

category(category){
  return (
    <Dropdown className="form-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {category.title}
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
  )
}

subCategory(subCategory){
  return (
    <Dropdown className="form-dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret>
            {subCategory.title}
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
  )
}

render() {
  //<EditFarmGoodCard farmGood={this.props.location.farmGood}/> //THIS MIGHT REPLACE CURRENTLY USED FARMGOODCARD ONE DAY I DUNNO
  const boxes = this.makeCheckBoxes();
   //eventually need to add category? anything else?
  //console.log(this.props.FarmgoodFormData)
  //console.log(this.state.initialFarmgood.id)
  if (this.props.FarmgoodFormData != undefined && this.state.initialFarmgood.id != 0) { //(this.state.initialFarmgood.id != 0 ) {
    let name, farmer, inventory, price, category, id
    
    //debugger 
    if (this.props.FarmgoodFormData.relationships) { //.category == undefined ) {
      //debugger 
      console.log(this.props.FarmgoodFormData)
      
      name = this.props.FarmgoodFormData.attributes.name
      farmer = this.props.FarmgoodFormData.attributes.farmer
      inventory = this.props.FarmgoodFormData.attributes.inventory
      price = this.props.FarmgoodFormData.attributes.price
      category = this.props.FarmgoodFormData.attributes.category.title
      id = Number(this.props.FarmgoodFormData.id )
    } else {
      //debugger 
      //const { name, farmer, inventory, price, category, id } = this.props.FarmgoodFormData //.attributes;

      console.log(this.props.FarmgoodFormData)

      name = this.props.FarmgoodFormData.name
      farmer = this.props.FarmgoodFormData.farmer
      inventory = this.props.FarmgoodFormData.inventory
      price = this.props.FarmgoodFormData.price
      category = this.props.FarmgoodFormData.category 
      id = Number(this.props.FarmgoodFormData.id )

      //debugger 
    }
    //debugger 
    console.log("loading form")
    //debugger 

    const showCategory = this.category(category)
    const showSubCategory = this.category(category)

    return (
      <div className="formFarmgood">
        
        Edit a Farmgood...
        <form onSubmit={this.handleEditSubmit.bind(this)}>
            <div>
            <label htmlFor="farmgood_id" />
            <input type="hidden" 
                    name={this.state.initialFarmgood.id}
                    value={this.state.initialFarmgood.id}
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
            value={this.state.initialFarmgood.farmer.id}
            />
            <br />
          <label htmlFor="farmgood_inventory">Quantity available:</label>
          <input
            type="number"
            onChange={this.handleEditChange.bind(this)}
            name="inventory"
            value={inventory}
          />
          <br />
          <label htmlFor="farmgood_price">Price:</label>
          <input 
            type="number"
            onChange={this.handleEditChange.bind(this)}
            name="price"
            value={price}
          />
          {showCategory}
          {showSubCategory}
            {boxes}
            <button type="submit">Edit Farmgood</button>
        </form>
        <button name="remove item" onClick={() => this.handleDelete(this.props.location.farmGood) }>remove item</button> 
        <button name="cancel edit" onClick={() => this.handleCancel() }>cancel edit</button>
      </div>
    )
  } else {
    return (
      <div>
        <p>loading</p>
      </div>
    )
  }
}
}

const mapStateToProps = state => {
  console.log("mstp")
  console.log(state.FarmgoodFormData)
  //console.log(state)
  //debugger 

  if (state.FarmgoodFormData.isEditing == false) {
    //console.log("First place")
    //console.log(state.farmGoods.editing.data.attributes)
    //debugger 
    return {
      initialFarmgood: state.farmGoods.editing.data,
      FarmgoodFormData: state.farmGoods.editing.data //.attributes //state.FarmgoodFormData
    }  
  } else {
    console.log("right place")
    //debugger 
    if (state.FarmgoodFormData.name == "") {
      return {
        initialFarmgood: state.farmGoods.editing.data, //.attributes,
        FarmgoodFormData: state.farmGoods.editing.data
      }
    } else {
      return {
        initialFarmgood: state.farmGoods.editing.data, //.attributes,
        FarmgoodFormData: state.FarmgoodFormData
      }
    }
    
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
  getSingleFarmGood,
})(AdminEditFarmgoodForm);

/*
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

class AdminEditFarmgoodForm extends Component {
// the state is added for days available 
  
  constructor(props) {
    super(props)

    debugger
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
        /*
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

    const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
     daysAvailable: this.selectedCheckboxes,
     days_array: this.days_array 
     
    })
    this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
  } else {
    
    this.selectedCheckboxes.add(event[0]);
    

    this.days_array = this.props.FarmgoodFormData.days_array.concat(event[0])
    
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


render() {
  //<EditFarmGoodCard farmGood={this.props.location.farmGood}/> //THIS MIGHT REPLACE CURRENTLY USED FARMGOODCARD ONE DAY I DUNNO

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
          {/* eventually the id will only be available for admin users to change things for farmers*}
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


export default connect(mapStateToProps, {
updateEditedFarmgoodFormData,
callToEditFarmgood,
deleteFarmGoods,
//updateFarmgoodFormData,
})(AdminEditFarmgoodForm);

//////////////////////////////////////////////////////////////////////////


import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateEditedFarmgoodFormData } from '../actions/FarmgoodForm';
import * as FarmgoodFormActions from '../actions/FarmgoodForm';
//import * as farmgoodActions from '../actions/farmGoods';
import { getSingleFarmGood } from '../actions/farmGoods';
import { callToEditFarmgood } from '../actions/farmGoods';
import EditFarmGoodCard from '../components/EditFarmGoodCard';
import CheckBox from '../components/common/CheckBox'
import { Route } from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { deleteFarmGoods } from '../actions/farmGoods';
import { Link } from 'react-router-dom';


class AdminEditFarmgoodForm extends Component {
// the state is added for days available 
  
  constructor(props) {
    super(props)

    debugger
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
        //initialFarmgood: undefined,
        initialFarmgood: {
          id: '',
          name: '', 
          inventory: '',
          price: '', 
          category: '',
          daysAvailable: []
        },
      }
    }
  
    toggle(){
      this.setState({
          dropdownOpen: !this.state.dropdownOpen,
      });
    }
  
    componentWillMount = () => {
      debugger
  
      const routeArray = document.location.href.split('/');
      const farmgoodID = Number(routeArray[routeArray.length - 2])
      const farmerID = Number(routeArray[routeArray.length - 4])
      //debugger 
      this.props.getSingleFarmGood(farmerID, farmgoodID);
  
      this.props.updateEditedFarmgoodFormData(this.state.initialFarmgood)

        const days_array = [] 
        const currentFarmgoodFormData = Object.assign({}, this.state.initialFarmgood, {
          days_array: days_array 
        })
        this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
      
      //console.log(days_array)
      
    }
  
    componentWillReceiveProps(nextProps){
      //debugger 

      if (nextProps.initialFarmgood.data.length == undefined) {
        this.setState({
          initialFarmgood: nextProps.initialFarmgood.data
        })
      }
      
      debugger 
      //LEFT OFF HERE, CRASHES AFTER THE ABOVE DEBUGGER, TRYING TO UPDATE FORM BUT FORM HASN'T BEEN ESTABLISHED YET OR SOMETHING ALONG THOSE LINES
      
      if (this.state.initialFarmgood != undefined ) {
        this.props.updateEditedFarmgoodFormData(this.state.initialFarmgood)

        const days_array = [] 
        const currentFarmgoodFormData = Object.assign({}, this.state.initialFarmgood, {
          days_array: days_array 
        })
        this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
      }
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
      
      if (this.state.initialFarmgood != ''){
        var oldDays = this.state.initialFarmgood.relationships.days.data.filter(day => {
            for (let i = 0; i< thisWeek.length; i++) {
                if (day.name === thisWeek[i][0]) {
                  thisWeek[i][1] = true 
                } else {
                  thisWeek[i][1] = false 
                }
            }
          })
      }
  
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
  
        const currentFarmgoodFormData = Object.assign({}, this.props.FarmgoodFormData, {
         daysAvailable: this.selectedCheckboxes,
         days_array: this.days_array 
         
        })
        this.props.updateEditedFarmgoodFormData(currentFarmgoodFormData)
      } else {
        
        this.selectedCheckboxes.add(event[0]);
        
  
        this.days_array = this.props.FarmgoodFormData.days_array.concat(event[0])
        
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
  
    setDays(){
      let days_array = []
      this.selectedCheckboxes = new Set();
      
      if (this.state.initialFarmgood != undefined){
        this.state.initialFarmgood.daysAvailable.map(day => {
            this.selectedCheckboxes.add(day.name);
            days_array.push(day.name)
        })
      }
    }

    loadForm(){
      return (
        <div className="formFarmgood">
          {console.log("here")}
          {console.log(this.state.initialFarmgood)}
      
          Edit a Farmgood...
          <form onSubmit={this.handleEditSubmit.bind(this)}>
              <div>
              <label htmlFor="farmgood_id" />
              <input type="hidden" 
                      name={this.state.initialFarmgood.id}
                      value={this.state.initialFarmgood.id}
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
              {/* eventually the id will only be available for admin users to change things for farmers}
              <label htmlFor="farmgood_quantity">Farmer for now (but eventually quantity)":</label>
              <input
              type="number"
              onChange={this.handleEditChange.bind(this)}
              name="farmer"
              value={this.state.initialFarmgood.attributes.farmer.id}
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
    
    render() {
      //<EditFarmGoodCard farmGood={this.props.location.farmGood}/> //THIS MIGHT REPLACE CURRENTLY USED FARMGOODCARD ONE DAY I DUNNO
      const { name, farmer, inventory, price, category, id } = this.props.FarmgoodFormData;

      if (this.state.initialFarmgood != undefined) {
        
        const theseDays = this.setDays();
      
        const boxes = this.makeCheckBoxes();
        //eventually need to add category? anything else?
        const thisForm = this.loadForm();
        
        return (
          <div>
          {this.state.initialFarmgood != undefined && 
            <div>
              {thisForm}
            </div>
          }
          </div>
        )
      } else {
        return (
        
          <div>
              {this.state.initialFarmgood == undefined &&
                <div>
                  {console.log("loading")}
                    <p>loading</p>
                </div>
              }
          </div>
        )
      }

    }
  }
  
  const mapStateToProps = state => {
      //debugger 
      //console.log(state.farmGood)
    return {
      initialFarmgood: state.farmGood,
      FarmgoodFormData: state.FarmgoodFormData
    }
  }
  
  
  
  export default connect(mapStateToProps, {
    getSingleFarmGood,
    updateEditedFarmgoodFormData,
    callToEditFarmgood,
    deleteFarmGoods,
    //updateFarmgoodFormData,
  })(AdminEditFarmgoodForm);
  



*/