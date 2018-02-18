import React from 'react';

const FarmGoodCard = ({ farmGood }) =>
  <div key={farmGood.id} className="FarmGoodsCard" >
      <h4>{farmGood.name}</h4>
      <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
      <p>{farmGood.price}</p>
      {farmGood.inventory > 0 &&
      <p>Available: {farmGood.attributes.inventory}</p>
      }
      {farmGood.inventory <= 0 &&
        <p>No longer available. Check back soon</p>
      }
      
  </div>

export default FarmGoodCard
