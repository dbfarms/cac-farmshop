import React from 'react';
import { IndexRoute, Route } from 'react-router-dom';

const FarmGoodsCard = ({ farmGood, isEditing }) =>
  //FUNCTION WILL DEPEND ON HOW USER IS SIGNED IN, I.E. CUSTOMER OR FARMER OR ADMIN
  <button key={farmGood.id} className="FarmGoodsCard" onClick={() => isEditing(farmGood)}>
      <h3>{farmGood.attributes.name}</h3>
      <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
      <p>{farmGood.price}</p>
      
  </button>

export default FarmGoodsCard
