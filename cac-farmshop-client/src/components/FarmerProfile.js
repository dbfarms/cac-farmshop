//probably phasing this one out

import React from 'react';
import { Route } from 'react-router-dom';


  const FarmerProfile = ({ farmer }) => {
    const bg = farmer.attributes["link"]
    return (
      <div>
      <div className="FarmerCard" style ={ { backgroundImage: "url(" + bg + ")" } } >
          <span className="farmerprofile">
              {farmer.attributes.name}
          </span>
      </div>
    </div> 
    )
}

export default FarmerProfile

/*

<img className="FarmerImage" src={farmer.attributes.link} alt={farmer.attributes.name} />

*/

