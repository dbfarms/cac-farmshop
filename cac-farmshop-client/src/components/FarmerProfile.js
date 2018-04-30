//probably phasing this one out

import React from 'react';
import { Route } from 'react-router-dom';


  const FarmerProfile = ({ farmer }) => {
    console.log(farmer)
    const bg = farmer.link
    return (
      <div>
      <div className="FarmerCard" style ={ { backgroundImage: "url(" + bg + ")" } } >
          <span className="farmerprofile">
              {farmer.name}
          </span>
      </div>
      <div>
        <span className="farmerDetails">
          {farmer.details}
        </span>
      </div>
    </div> 
    )
}

export default FarmerProfile

/*
const FarmerProfile = ({ farmer }) => {
    console.log(farmer)
    const bg = farmer.attributes["link"]
    return (
      <div>
      <div className="FarmerCard" style ={ { backgroundImage: "url(" + bg + ")" } } >
          <span className="farmerprofile">
              {farmer.attributes.name}
          </span>
      </div>
      <div>
        <span className="farmerDetails">
          {farmer.attributes.details}
        </span>
      </div>
    </div> 
    )
}
<img className="FarmerImage" src={farmer.attributes.link} alt={farmer.attributes.name} />

*/

