import React from 'react';


const FarmerCard = ({ farmer }) =>
  <div key={farmer.id} className="FarmerCard">
  <h3>{farmer.attributes.name}</h3>
  <img className="FarmerImage" src={farmer.attributes.img_url} alt={farmer.attributes.name} />
  <p>{farmer.attributes.address}</p>
</div>
  

export default FarmerCard

/*



*/