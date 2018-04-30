import React, { Component } from 'react';
import { connect } from 'react-redux';
import FarmerProfile from '../components/FarmerProfile';
import {getFarmer} from '../actions/farmers';
import './FarmerCard.css';

class FarmerShow extends Component {
  constructor(props){
    super(props)
    //debugger 
    this.state = {
      farmer: this.props.farmer
    }
  }

  componentWillMount(){
    //debugger
    const routeArray = document.location.href.split('/');
    const farmerID = Number(routeArray[routeArray.length - 1])
    //debugger
    this.props.getFarmer(farmerID)
  }

  componentWillReceiveProps(nextProps) {
    //debugger
    this.setState({
      farmer: nextProps.farmer
    })
  }

  render(){
    const farmer = this.state.farmer
    //debugger 

    return (
      <div>
        {farmer != undefined &&
          <div>
            <div>
              <FarmerProfile farmer={farmer} />
            </div>
          </div>

        }
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    farmer: state.farmers.data
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