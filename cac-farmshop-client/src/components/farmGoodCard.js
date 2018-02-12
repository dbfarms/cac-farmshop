import React from 'react';

const FarmGoodCard = ({ farmGood }) =>
  <div key={farmGood.id} className="FarmGoodsCard" >
      <h3>{farmGood.name}</h3>
      <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
      <p>{farmGood.price}</p>
      <br />
      
  </div>

export default FarmGoodCard
