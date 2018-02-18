import React from 'react';
import { IndexRoute, Route } from 'react-router-dom';

const FarmGoodsCard = ({ farmGood, isEditing }) =>
  //FUNCTION WILL DEPEND ON HOW USER IS SIGNED IN, I.E. CUSTOMER OR FARMER OR ADMIN
  <button key={farmGood.id} className="FarmGoodsCard" onClick={() => isEditing(farmGood)}>
      <h4>{farmGood.attributes.name}</h4>
      <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
      {farmGood.attributes.inventory > 0 &&
      <div>
      <p>Available: {farmGood.attributes.inventory} at ${farmGood.attributes.price} each</p>
      
      </div>
      }
      {farmGood.attributes.inventory <= 0 &&
        <p>No longer available. Check back soon</p>
      }
  </button>

export default FarmGoodsCard

/*

{if ({farmGood.attributes.inventory > 0 }) {
      <p>Available: {farmGood.attributes.inventory}</p>
      } else {
        <p>Out of stock; check back soon</p>
      }

*/