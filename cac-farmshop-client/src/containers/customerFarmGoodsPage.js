import React, { Component } from 'react';
import { connect } from 'react-redux'
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
import { getCart } from '../actions/carts'
import './FarmGoods.css';

class CustomerFarmGoods extends Component {
  constructor(props) {
    super(props);

    //debugger 
    
    this.state = {
      showKey: 'show all', //show all
      showDay: '',
      showCategory: '',
      days: [],
      cart: '',
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
      this.props.getCustomerFarmGoods()
    }
    if (this.state.farmGoods_array === undefined){
      this.props.getCustomerFarmGoods()
    }
    //this.props.getCart(sessionStorage.id)
    //debugger
  }

  componentDidMount(){
    this.props.getCart(sessionStorage.id)
  }

  componentWillReceiveProps(nextProps){
    //debugger
    this.setState({
      farmGoods_array: nextProps.farmGoods.data,
      cart: nextProps.cart
    })
  }

  handleShowChange = showKey => this.setState({ showKey: showKey })
  handleDay = showDay => this.setState({ showDay: showDay  })
  handleCategory = showCategory => this.setState({ showCategory: showCategory })

  render() {
    //debugger
    console.log(this.state.cart)
    var objectToArrayDays = []
    var thisFilter = []
    //
    return (
      <div className="page-tree">
      <FarmgoodNav changeShow={this.handleShowChange} changeDay={this.handleDay} changeCategory={this.handleCategory}/>
      {this.state.farmGoods_array === undefined &&
        <p>loading loading</p>
      }
      {this.state.farmGoods_array != undefined &&
        <div>
        {this.state.showKey === "show all" && 
          <div>
            <div className="Farm-Goods-Container">
              <h1>For sale (click on farmgood to edit): </h1>
              {this.state.farmGoods_array.map(farmGood => <CustomerFarmGoodModal key={farmGood.id} farmGood={farmGood} cart={this.state.cart}/>)}
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
              {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood}  />)}
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
              {thisFilter.map(farmGood => <CustomerFarmGoodModal  key={farmGood.id} farmGood={farmGood}  />)}
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
      cart: state.cart
  })
}

export default connect(mapStateToProps, { getCustomerFarmGoods, getCart })(CustomerFarmGoods); // 

/*

*/