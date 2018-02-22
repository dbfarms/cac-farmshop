import React from 'react';
//import { Redirect } from 'react-router'
import EditFarmgoodForm from '../containers/EditFarmgoodForm';
import { Redirect, Link } from 'react-router-dom';

const FarmGoodCard = (props) =>
  
<div className="FarmGoodsCard" >
{ /*
{props.location.farmGood === undefined && // 
  <div>
  {console.log('redirecting from farmgoods card page') }
  <Redirect to="/farm-goods" />
  </div>

} */}
{//props.location.farmGood !== undefined &&
  <div>
  <h4>{props.location.farmGood.attributes.name}</h4>
  <img className="farmGoodImage" src={props.location.farmGood.attributes.img_url} alt={props.location.farmGood.id} />
  { props.location.farmGood.attributes.inventory > 0 &&
  <p>Available: {props.location.farmGood.attributes.inventory} at ${props.location.farmGood.attributes.price} each</p>
  }

  {props.location.farmGood.attributes <= 0 &&
    <p>No longer available. Check back soon</p>
  }
    <Link to={{
      pathname: `/farm-goods/${props.location.farmGood.id}/edit`,
      farmGood: props.location.farmGood
    }}> edit farmgood </Link>
  </div>
}
</div>
 
 




export default FarmGoodCard

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