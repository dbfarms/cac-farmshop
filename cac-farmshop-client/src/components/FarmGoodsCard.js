import React, { Component } from 'react';
import { IndexRoute, Route, Link } from 'react-router-dom';

class FarmGoodsCard extends Component {
  constructor(){
    super()

  }
  
  render(){
    const {isEditing, farmGood} = this.props
    return (<button key={farmGood.id} className="FarmGoodsCard" onClick={() => isEditing(farmGood) }>
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
      
    </button>)
  }
}

export default FarmGoodsCard

/*
<Link to={`/farm-goods/${farmGood.id}`}>{farmGood.name}</Link>
{if ({farmGood.attributes.inventory > 0 }) {
      <p>Available: {farmGood.attributes.inventory}</p>
      } else {
        <p>Out of stock; check back soon</p>
      }

*/