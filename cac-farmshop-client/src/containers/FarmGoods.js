import React, { Component } from 'react';
import { connect } from 'react-redux'
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
      showKey: 'show all',
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
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      farmGoods_array: nextProps.farmGoods.data
      //days_array: nextProps.days.data
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
  
  /*
  this.setState(
    {
      farmgood: farmGood,
      isEditing: true,
    })
  */

  handleDelete(farmGood){
    this.props.deleteFarmGoods(farmGood);
    alert('deleting')
    this.setState({
      isEditing: false,
      showKey: 'show all',
    })
  }

  handleSubmit(){
    this.props.history.push('/farm-goods')
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
             {thisFilter.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
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
             {thisFilter.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
          </div>
      }
      {this.state.showKey === "new"  &&
          <div>
            <h1>New Farm Good</h1>
            <NewFarmgoodForm 
            farmgood={this.state.farmgood}
            daysAvailable={this.state.checkBoxDaysAvailable} //unclear we're using this here... 
            days={this.state.days}
            onSubmit={this.handleSubmit}
          />
            </div>
      }
      {this.state.isEditing === true &&
          <div>
            <h1>edit farmgood</h1>
            <EditFarmgoodForm
              farmgood={this.state.farmgood} 
              daysAvailable={this.state.farmgood.relationships.days.data}
              onSave={this.saveFarmgood}
              onChange={this.updateFarmgoodState}
              isEditing={this.state.isEditing}
              days={this.state.days}
              />
            <FarmGoodCard farmGood={this.state.farmgood.attributes}/>
            <button name="cancel edit" onClick={() => this.setState({isEditing: false})}>cancel edit</button>
            <button name="remove item" onClick={() => this.handleDelete(this.state.farmgood) }>remove item</button> 
          </div>}
      {this.state.showKey === "show all" && 
        <div>
           <div className="Farm-Goods-Container">
            <h1>For sale (click on farmgood to edit): </h1>
            {this.state.farmGoods_array.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
          </div>
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



--
function daysAvailableCheckBoxes(daysAvailable, farmgood=null) {  
  return hobbies.map(dayAvailable => {
    if (farmgood && farmgood.dayAvailable_ids.filter(dayAvailableId => dayAvailableId  dayAvailable.id).length > 0) {
      dayAvailable['checked'] = true;
    } else {
      dayAvailable['checked'] = false;
    }
    return dayAvailable;
  });
}

function mapStateToProps(state, ownProps) {  
  const stateHobbies = Object.assign([], state.hobbies)
  let checkBoxHobbies = [];
  let farmgoodHobbies = [];
  let farmgood = {name: '', breed: '', weight: '', temperament: '', dayAvailable_ids: []};
  const farmgoodId = ownProps.params.id;
  if (farmgoodId && state.farmgoods.length > 0 && state.hobbies.length > 0) {
    farmgood = getfarmgoodById(state.farmgoods, ownProps.params.id);
    if (farmgood.dayAvailable_ids.length > 0) {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, farmgood);
      farmgoodHobbies = collectfarmgoodHobbies(stateHobbies, farmgood);
    } else {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies)
    }
  } 
    return {farmgood: farmgood, checkBoxHobbies: checkBoxHobbies, farmgoodHobbies: farmgoodHobbies};
}

/// probably junk


 <div className="Farm-Goods-Container">
            <h1>For sale: </h1>
            {this.props.farmGoods.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
          </div>
          <FarmgoodForm />

/////


      {this.state.isEditing === true &&
        <div>
          <h1>edit farmgood</h1>
          <FarmgoodForm
            farmgood={this.state.farmgood}
            //daysAvailable-{this.state.checkBoxDaysAvailable}
            onSave={this.saveFarmgood}
            onChange={this.updateFarmgoodState}
            //onDaysAvailableChange={this.updateFarmgoodDaysAvailable}
            />
          <FarmGoodCard farmGood={this.state.farmgood}/>
          <button name="cancel edit" onClick={() => this.setState({isEditing: false})}>cancel edit</button>
        </div>
      }
      {this.state.isEditing === false && 
        <div>
          <h1>you are not editing</h1>
           <div className="Farm-Goods-Container">
            <h1>For sale: </h1>
            {this.props.farmGoods.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
          </div>
          <FarmgoodForm />
        </div>
      }



*/