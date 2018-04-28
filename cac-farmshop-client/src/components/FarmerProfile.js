import React from 'react';
import { Route } from 'react-router-dom';


  const FarmerProfile = ({ farmer }) => {
    return (
      <div className="farmerShow">
        <a key={farmer.id} href={"/farmers/" + farmer.id} >
          <h3>{farmer.attributes.name}</h3>
          <p>{farmer.attributes.address}</p>
        
        </a>
      </div>
    )
}

export default FarmerProfile

/*

<img className="FarmerImage" src={farmer.attributes.link} alt={farmer.attributes.name} />

*/

