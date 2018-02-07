import React from 'react';

const FarmerCard = ({ farmer }) =>

<div key={farmer.id} className="FarmerCard">
    <h3>{farmer.name}</h3>
    <img className="FarmImage"/> //src={farmer.img_url} alt={farmer.name} />
    <p>{farmer.address}</p>
</div>

export default FarmerCard
