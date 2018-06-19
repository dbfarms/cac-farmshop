import React, { Component } from 'react';
import { connect } from 'react-redux'
import FarmGoodModal from '../components/farmGoodModal';
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
//import { getUser } from '../actions/sessionActions'

class FarmerFarmGoods extends Component {
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
    //debugger
    //this.props.getUser()
    
    if (this.props.farmgood === undefined ){
      this.props.getFarmGoods()
    }
    if (this.state.farmGoods_array === undefined){
      this.props.getFarmGoods()
    }
    
  }

  componentWillReceiveProps(nextProps){
    const farmersFarmGoods = nextProps.farmGoods.data.filter(fg => fg.attributes.farmer.id === Number(sessionStorage.id))
    this.setState({
      farmGoods_array: farmersFarmGoods
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
    //const farmerId = this.farmerIdFilter();
    var objectToArrayDays = []
    var thisFilter = []

    return (
      <div className="page-tree">
      <FarmgoodNav changeShow={this.handleShowChange} changeDay={this.handleDay} changeCategory={this.handleCategory}/>
      {this.state.showKey === "show all" && 
        <div>
           <div className="Farm-Goods-Container">
            <h1>For sale (click on farmgood to edit): </h1>
            {this.state.farmGoods_array.map(farmGood => <FarmGoodModal  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
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
             {thisFilter.map(farmGood => <FarmGoodModal  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing} />)}
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
             {thisFilter.map(farmGood => <FarmGoodModal  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
          </div>
      }
      
      </div>
    )
  }
}
//ORIGINALLY: {this.props.farmGoods.data.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
// ** this was in the FarmGoodsCard tag above

const mapStateToProps = (state) => {
  //debugger 
  //state.farmGoods.data[0].relationships.farmer.data.id
  return ({
      farmGoods: state.farmGoods.all, //maybe add another {} in fg reducer for specific farmer?
      days: state.days,
      //user: state.user
  })
}

export default connect(mapStateToProps, { getFarmGoods, deleteFarmGoods, /*getUser*/ })(FarmerFarmGoods); // 

/*

*/