import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import FarmerShow from '../containers/FarmerShow';
import FarmerCard from '../components/farmerCard'
import { getFarmers } from '../actions/farmers';
import { connect } from 'react-redux';

var farmerId = undefined 

//debugger

class FarmersList extends Component {
  constructor(props){
    super(props)

    this.state = {
      farmers: this.props.farmers
    }
  }

  componentWillMount(){
    //debugger
    this.props.getFarmers();
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      farmers: nextProps.farmers
    })
  }

  
  renderFarmers = () => { 
    //debugger 
    return this.state.farmers.map((farmer, keyIndex) =>{
    //debugger
      return (
            <FarmerCard 
              key={keyIndex} 
              farmer={farmer}
            />
      )
      }
    )
  }

  //
  render() {
    const { match } = this.props
    const listOfFarmers = this.renderFarmers()
    return (
      <div >
        <div>
          <h3>Farmers</h3>
        </div>
        <div>
          <ul className="farmer-grid">
            {listOfFarmers}
          </ul>
        </div>
      </div>
    )
  }
} 

/*

<Route path={match.url}
            render={() => listOfFarmers}
        />

*/


const mapStateToProps = (state) => {
  return {
    farmers: state.farmers
  };
}

export default connect(mapStateToProps, { getFarmers })(FarmersList);



/*

//  <Route path="/:farmerId" component={FarmerShow}/>
*/