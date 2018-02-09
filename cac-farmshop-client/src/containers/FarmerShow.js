import React from 'react';
import { connect } from 'react-redux'
import FarmerCard from '../components/farmerCard'
import './FarmerCard.css';

//debugger

const FarmerShow = ({farmer}) =>

      <div>
        <FarmerCard farmer={farmer} />
      </div>



export default FarmerShow 

