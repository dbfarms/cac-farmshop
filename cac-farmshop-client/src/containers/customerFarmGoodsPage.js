import React, { Component } from 'react';
import { connect } from 'react-redux'
//import FarmGoodModal from '../components/farmGoodModal';
import CustomerFarmGoodModal from '../components/customerFarmgoodModal';
import FarmGoodsCard from '../components/FarmGoodsCard';
import FarmGoodCard from '../components/farmGoodCard';
import { getFarmGoods } from '../actions/farmGoods'; // requests list of farmgoods from server
import { getDays } from '../actions/days'; // requests from server
import { deleteFarmGoods } from '../actions/farmGoods';
import NewFarmgoodForm from './NewFarmgoodForm';
import EditFarmgoodForm from './EditFarmgoodForm';
import FarmgoodNav from '../components/farmgoodNav'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import './FarmGoods.css';
//import StickyHeader from 'react-sticky-header';
import CartCard from '../components/CartCard';

class FarmGoods extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showKey: 'show all', //show all
      showDay: '',
      showCategory: '',
      days: [],
      isEditing: false,
      openLineitems: 'visitor', 
      farmgood: {
        name: '',
        farmer: '', //EVENTUALLY THIS WILL DEFAULT TO THE LOGGED IN FARMER BUT FOR NOW YOU CAN CHOOSE
        days_available_ids: [],
        theWeek: [ 
          ["Monday", false],
          ["Tuesday", false],
          ["Wednesday", false],
          ["Thursday", false],
          ["Friday", false],
          ["Saturday", false],
          ["Sunday", false],
        ],
      },
      farmGoods_array: [],
      days_array: [],
//      daysAvailable: this.props.farmgood.attributes.daysAvailable,
      checkBoxDaysAvailable: this.props.checkBoxDaysAvailable
    };
    
  }

  componentWillMount(){
    if (this.props.farmgood === undefined ){
      this.props.getFarmGoods()
    }
    if (this.state.farmGoods_array === undefined){
      this.props.getFarmGoods()
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      farmGoods_array: nextProps.farmGoods.data
    })
  }

  toggleEdit(){
    this.setState({isEditing: !this.state.isEditing})
  }

  handleIsEditing = farmGood => {
    this.props.history.push({
      pathname: `/farm-goods/${farmGood.id}`,
      farmGood,
    })
  }
  
  handleDelete(farmGood){
    this.props.deleteFarmGoods(farmGood);
    alert('deleting')
    this.setState({
      isEditing: false,
      showKey: 'show all',
    })
  }

  handleShowChange = showKey => this.setState({ showKey: showKey })
  handleDay = showDay => this.setState({ showDay: showDay  })
  handleCategory = showCategory => this.setState({ showCategory: showCategory })

  showGoodsSplit() {
    var thisFilter = []
    return (
      <div>
      {this.state.farmGoods_array === undefined &&
        <p>loading loading</p>
      }
      {this.state.farmGoods_array != undefined &&
        <div className="Farm-Goods-Container">
        {this.state.showKey === "show all" && 
          <div>
              <div >
                <span className="header-one">Currently For Sale</span>
              </div>
              <ul className="fg-grid">
                {this.state.farmGoods_array.map(farmGood =>  
                  <CustomerFarmGoodModal 
                    key={farmGood.id} 
                    farmGood={farmGood} 
                    lineitems={this.state.openLineitems}
                  />
                  )
                }
              </ul>
          </div>
        }
        {this.state.showKey === "day"  &&
            <div>
              <h1>{this.state.showDay}</h1>
              
              {this.state.farmGoods_array.map(farmGood => {
                for (let i=0; i<farmGood.relationships.days.data.length; i++) {
                  if (farmGood.relationships.days.data[i].name === this.state.showDay) {
                    thisFilter.push(farmGood)
                  }
                }
              })
              }
              {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood} lineitems={this.state.openLineitems} />)}
            </div>
        }
        {this.state.showKey === "category"  &&
            <div>
              <h1>{this.state.showCategory}</h1>
              {this.state.farmGoods_array.map(farmGood => {
                  if (farmGood.attributes.category.title === this.state.showCategory) {
                    thisFilter.push(farmGood)
                  }
              })
              }
              {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood} lineitems={this.state.openLineitems} />)}
            </div>
        }
        </div>
        }
      </div>
    )
  }

  render() {
    //debugger
    var objectToArrayDays = []
   
    return (
      <div>
        <div id="fixed1" className="top">
              <FarmgoodNav 
                changeShow={this.handleShowChange} 
                changeDay={this.handleDay} 
                changeCategory={this.handleCategory}
              />
          </div>
        <MediaQuery query="(max-width: 1294px)" >
        <div>
          <div className="page-tree-small">
            <div>
              {this.showGoodsSplit()}
            </div>
            <br />
          </div>
        </div>
        </MediaQuery>
        
        <MediaQuery query="(min-width: 1294px)" > 
          
          <div className="page-tree">
            <div>
            </div>
            <div>
              {this.showGoodsSplit()}
            </div>
          </div>
        </MediaQuery>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //console.log(state)
  //const stateDays = Object.assign([], state.days)
  return ({
      farmGoods: state.farmGoods,
      days: state.days 
  })
}

export default connect(mapStateToProps, { getFarmGoods, deleteFarmGoods })(FarmGoods); // 

/*
getCart

import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomerFarmGoodModal from '../components/customerFarmgoodModal';
//import CustomerFarmGoodModals from '../components/customerFarmgoodModals';
import FarmGoodsCard from '../components/FarmGoodsCard';
import FarmGoodCard from '../components/farmGoodCard';
import { getCustomerFarmGoods } from '../actions/farmGoods'; // requests list of farmgoods from server
import { getDays } from '../actions/days'; // requests from server
import { deleteFarmGoods } from '../actions/farmGoods';
import NewFarmgoodForm from './NewFarmgoodForm';
import EditFarmgoodForm from './EditFarmgoodForm';
import FarmgoodNav from '../components/farmgoodNav'
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
//import { getCart } from '../actions/carts'
import { getOpenLineItems } from '../actions/lineitems'
import CartCard from '../components/CartCard';
import '../index.css';

class CustomerFarmGoods extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showKey: 'show all', //show all
      showDay: '',
      showCategory: '',
      days: [],
      cart: '',
      openLineitems: '',
      farmgood: {
        name: '',
        farmer: '', 
        days_available_ids: [],
        theWeek: [ 
          ["Monday", false],
          ["Tuesday", false],
          ["Wednesday", false],
          ["Thursday", false],
          ["Friday", false],
          ["Saturday", false],
          ["Sunday", false],
        ],
      },
      farmGoods_array: [],
      days_array: [],
//      daysAvailable: this.props.farmgood.attributes.daysAvailable,
      checkBoxDaysAvailable: this.props.checkBoxDaysAvailable
    };
    
  }

  componentWillMount(){
    if (this.props.farmgood === undefined ){
      this.props.getCustomerFarmGoods()
    }
    if (this.state.farmGoods_array === undefined){
      this.props.getCustomerFarmGoods()
    }
    //this.props.getCart(sessionStorage.id)
    //debugger
  }

  componentDidMount(){
    //this.props.getCart(sessionStorage.id)
    this.props.getOpenLineItems(sessionStorage.id)
  }

  componentWillReceiveProps(nextProps){
    //debugger
    
    this.setState({
      farmGoods_array: nextProps.farmGoods.data,
      openLineitems: nextProps.openLineitems
    })
  }

  handleShowChange = showKey => this.setState({ showKey: showKey })
  handleDay = showDay => this.setState({ showDay: showDay  })
  handleCategory = showCategory => this.setState({ showCategory: showCategory })

  render() {
    
    var objectToArrayDays = []
    var thisFilter = []
    
    return (
      <div className="page-tree">
        <div className="dropdown">
          <span></span>
          <FarmgoodNav changeShow={this.handleShowChange} changeDay={this.handleDay} changeCategory={this.handleCategory}/>
        </div>
        {this.state.card !== '' && 
          <div className="cartcardhere">
            <span></span>
            <CartCard cart={this.state.openLineitems}/>
          </div>
        }
        {this.state.farmGoods_array === undefined &&
          <p>loading loading</p>
        }
        {this.state.farmGoods_array != undefined &&
        <div className="Farm-Goods-Container">
          {this.state.showKey === "show all" && 
            <div>
              <div>
                <div >
                  <span className="header-one">Currently For Sale: </span>
                </div>
                <ul className="fg-grid">
                  {this.state.farmGoods_array.map(farmGood =>  
                    <CustomerFarmGoodModal 
                      key={farmGood.id} 
                      farmGood={farmGood} 
                      lineitems={this.state.openLineitems}
                    />
                    )
                  }
                </ul>
              </div>
            </div>
          }
          {this.state.showKey === "day"  &&
              <div>
                <h1>{this.state.showDay}</h1>
                
                {this.state.farmGoods_array.map(farmGood => {
                  for (let i=0; i<farmGood.relationships.days.data.length; i++) {
                    if (farmGood.relationships.days.data[i].name === this.state.showDay) {
                      thisFilter.push(farmGood)
                    }
                  }
                })
                }
                {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood} lineitems={this.state.openLineitems} />)}
              </div>
          }
          {this.state.showKey === "category"  &&
              <div>
                <h1>{this.state.showCategory}</h1>
                {this.state.farmGoods_array.map(farmGood => {
                    if (farmGood.attributes.category.title === this.state.showCategory) {
                      thisFilter.push(farmGood)
                    }
                })
                }
                {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood} lineitems={this.state.openLineitems} />)}
              </div>
          }
          </div>
          }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  //debugger 
  
  return ({
      farmGoods: state.farmGoods,
      days: state.days, 
      //cart: state.cart,
      openLineitems: state.openLineitems 
  })
}

export default connect(mapStateToProps, { getCustomerFarmGoods, getOpenLineItems })(CustomerFarmGoods); // getLineItems 
*/