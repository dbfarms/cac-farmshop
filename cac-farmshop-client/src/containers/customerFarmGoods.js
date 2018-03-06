import React, { Component } from 'react';
import { connect } from 'react-redux'
import FarmGoodModal from '../components/farmGoodModal';
import { getFarmGoods } from '../actions/farmGoods'; // requests list of farmgoods from server
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

  handleShowChange = showKey => this.setState({ showKey: showKey })
  handleDay = showDay => this.setState({ showDay: showDay  })
  handleCategory = showCategory => this.setState({ showCategory: showCategory })

  render() {
    //debugger
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