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
import './FarmGoods.css';

class FarmGoods extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showKey: 'show all', //show all
      showDay: '',
      showCategory: '',
      days: [],
      isEditing: false,
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

  render() {
    //debugger
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
                {this.state.farmGoods_array.map(farmGood => <CustomerFarmGoodModal key={farmGood.id} farmGood={farmGood} lineitems={this.state.openLineitems}/>)}
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
//ORIGINALLY: {this.props.farmGoods.data.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
// ** this was in the FarmGoodsCard tag above

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



*/