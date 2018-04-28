import React from 'react';
//ort FarmerView from './FarmerView';
//import FarmgoodView from './FarmgoodView';
import { Route } from 'react-router-dom';


  const FarmerCard = ({ farmer }) => {
    return (
      <div className="FarmerCard">
        <a key={farmer.id} href={"/farmers/" + farmer.id} >
          <h3>{farmer.attributes.name}</h3>
          <p>{farmer.attributes.address}</p>
        
        </a>
      </div>
    )
}

export default FarmerCard

/*

<img className="FarmerImage" src={farmer.attributes.link} alt={farmer.attributes.name} />

*/