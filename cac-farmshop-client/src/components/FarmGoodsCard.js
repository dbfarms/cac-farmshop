import React from 'react';

const FarmGoodsCard = ({ farmGood }) =>

  <div key={farmGood.id} className="farmGoodsCard">
      <h3>{farmGood.name}</h3>
      <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
      <p>{farmGood.price}</p>
  </div>

export default FarmGoodsCard
