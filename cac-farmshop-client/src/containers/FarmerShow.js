import React from 'react';
import { connect } from 'react-redux'
import FarmerCard from '../components/farmerCard'
import './FarmerCard.css';


const FarmerShow = ({farmer}) => 
  <div>
    <FarmerCard farmer={farmer} />
  </div>
    

export default FarmerShow 

/*

 <div>
        <FarmerCard farmer={farmer} />
      </div>

 console.log(farmer)
    debugger 
*/