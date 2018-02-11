import React, { Component } from 'react';
import { connect } from 'react-redux'
import FarmGoodsCard from '../components/FarmGoodsCard';
import FarmGoodCard from '../components/farmGoodCard';
import { getFarmGoods } from '../actions/farmGoods'
import FarmgoodForm from './FarmgoodForm';
import { bindActionCreators } from 'redux';
import { callToEditFarmgood } from '../actions/farmGoods'
import './FarmGoods.css';

class FarmGoods extends Component {
  constructor(props, context) {
    super(props, context);
     
    this.state = {
      isEditing: false,
      farmgood: 0,
      //daysAvailable: this.props.daysAvailable,
      //checkBoxDaysAvailable: this.props.checkBoxDaysAvailable
    };
    this.updateFarmgoodState = this.updateFarmgoodState.bind(this);
    //this.updateFarmgoodDaysAvailable = this.updateFarmgoodDaysAvailable.bind(this);
    //this.toggleEdit = this.toggleEdit.bind(this);
    this.saveFarmgood - this.saveFarmgood.bind(this);
  }
  /*
  updateFarmgoodDaysAvailable(event) {
    const farmgood = this.state.farmgood;
    const daysAvailableId = event.target.value;
    const dayAvailable = this.state.checkBoxDaysAvailable.filter(day => day.id  daysAvailableId)[0];
    const checked = !dayAvailable.checked;
    dayAvailable['checked'] = !dayAvailable.checked;
    if (checked) {
      farmgood.daysAvailable_ids.push(dayAvailable.id);
    } else {  
      farmgood.daysAvailable_ids.splice(farmgood.daysAvailable_ids.indexOf(dayAvailable.id));
    }
    this.setState({dayAvailable: dayAvailable});
    }
  }
  */

  saveFarmgood(event){
    event.preventDefault();
    this.props.actions.updateFarmgood((this.state.farmgood));
  }

  updateFarmgoodState(event) {
    const field = event.target.name;
    debugger
    const farmgood = this.state.farmgood;
    farmgood[field] = event.target.value;
    return this.setState({farmgood: farmgood});

  }


  toggleEdit(){
    this.setState({isEditing: !this.state.isEditing})
  }

  //SEE BELOW FOR DAYS AVAILABLE, TO BE ADDED LATER

  componentDidMount(){
    //debugger
    //this.state.isEditing = false 
    this.props.getFarmGoods()
  }
  
  /*
  componentWillReceiveProps(nextProps) {
    //debugger 
    if (this.props.farmgood.id != nextProps.farmgood.id) {
      this.setState({farmgood: nextProps.farmgood});
    }
    //if (this.props.checkBoxDaysAvailable.length < nextProps.checkBoxHobbies.length) {
    //  this.setState({farmgoodDaysAvailable: nextProps.farmgoodDaysAvailable, checkBoxDaysAvailable: nextProps.checkBoxDaysAvailable});
    //})
  }
  */

  handleIsEditing = farmGood => this.setState(
    {
      farmgood: farmGood,
      isEditing: true,
    })
 //*/

 //   handleIsEditing = farmGood => console.log(this.state)

  render() {
    console.log(this.state)
    //debugger
    return (
      <div className="page-tree">
        <div className="Farm-Goods-Container">
            <h1>For sale: </h1>
            {this.props.farmGoods.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing}  />)}
          </div>
          <FarmgoodForm />
      </div>
    )
  }
}
// ** this was in the FarmGoodsCard tag above

const mapStateToProps = (state) => {
  //console.log(state)
  return ({
      farmGoods: state.farmGoods
  })
}

function mapDispatchToProps(dispatch) {
  //console.log(dispatch)
  return {
    actions: bindActionCreators(callToEditFarmgood, dispatch)
  }
}

//export default connect(mapStateToProps, { getFarmGoods })(FarmGoods);
export default connect(mapStateToProps, { getFarmGoods })(FarmGoods); // 

/*


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
            {this.props.farmGoods.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} isEditing={this.handleIsEditing(farmGood)}  />)}
          </div>
          <FarmgoodForm />
        </div>
      }


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

*/