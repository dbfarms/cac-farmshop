import React from 'react';
import FarmerView from './FarmerView';
import FarmgoodView from './FarmgoodView';
import { Route } from 'react-router-dom';


  const FarmerCard = ({ farmer }) => {
    return (
      <div key={farmer.id} className="FarmerCard">
        <h3>{farmer.attributes.name}</h3>
        <img className="FarmerImage" src={farmer.attributes.img_url} alt={farmer.attributes.name} />
        <p>{farmer.attributes.address}</p>
      
      

      </div>
    )
}

export default FarmerCard

/*



*/