import React, { Component } from 'react';
import { connect } from 'react-redux'
import FarmerCard from '../components/farmerCard'
import {getFarmer} from '../actions/farmers'
import './FarmerCard.css';

class FarmerShow extends Component {
  constructor(props){
    super(props)

    this.state = {
      farmer: this.props.farmer
    }
  }

  componentWillMount(){
    const routeArray = document.location.href.split('/');
    const farmerID = Number(routeArray[routeArray.length - 1])
    //debugger
    this.props.getFarmer(farmerID)
  }

  render(){
    const farmer = this.state.farmer
    return (
      <div>
        {farmer != undefined &&
          <div>
            <div>
              <FarmerCard farmer={farmer} />
            </div>
          </div>

        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    farmer: state.farmer
  }
}

export default connect(mapStateToProps, {getFarmer})(FarmerShow);





/*

 <div>
        <FarmerCard farmer={farmer} />
      </div>

 console.log(farmer)
    debugger 
*/