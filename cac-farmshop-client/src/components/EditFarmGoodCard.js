import React from 'react';
//import { Redirect } from 'react-router'
import EditFarmgoodForm from '../containers/EditFarmgoodForm';
import { Redirect, Link } from 'react-router-dom';

const EditFarmGoodCard = (props) =>
  
<div className="FarmGoodsCard" >
{ /*
{props.farmGood === undefined && // 
  <div>
  {console.log('redirecting from farmgoods card page') }
  <Redirect to="/farm-goods" />
  </div>

} */}
{//props.farmGood !== undefined &&
  <div>
  <h4>{props.farmGood.attributes.name}</h4>
  <img className="farmGoodImage" src={props.farmGood.attributes.img_url} alt={props.farmGood.id} />
  { props.farmGood.attributes.inventory > 0 &&
  <p>Available: {props.farmGood.attributes.inventory} at ${props.farmGood.attributes.price} each</p>
  }

  {props.farmGood.attributes <= 0 &&
    <p>No longer available. Check back soon</p>
  }
    <Link to={{
      pathname: `/farm-goods/${props.farmGood.id}/edit`,
      farmGood: props.farmGood
    }}> edit farmgood </Link>
  </div>
}
</div>
 
 




export default EditFarmGoodCard

/*

<button onClick={() => {
    <Link to={"/farm-goods/edit"}/>
    }}> edit farmgood
  </button>
 <div key={farmGood.id} className="FarmGoodsCard" >
      <h4>{farmGood.name}</h4>
      <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
      {farmGood.inventory > 0 &&
      <p>Available: {farmGood.inventory} at ${farmGood.price} each</p>
      }
      {farmGood.inventory <= 0 &&
        <p>No longer available. Check back soon</p>
      }
      
  </div>

*/