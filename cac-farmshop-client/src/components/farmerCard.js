import React from 'react';
//ort FarmerView from './FarmerView';
//import FarmgoodView from './FarmgoodView';
import { Route } from 'react-router-dom';


  const FarmerCard = ({ farmer }) => {
    return (
      <a key={farmer.id} className="FarmerCard" href={"/farmers/" + farmer.id} >
        <h3>{farmer.attributes.name}</h3>
        <img className="FarmerImage" src={farmer.attributes.img_url} alt={farmer.attributes.name} />
        <p>{farmer.attributes.address}</p>
      
      

      </a>
    )
}

export default FarmerCard

/*



*/