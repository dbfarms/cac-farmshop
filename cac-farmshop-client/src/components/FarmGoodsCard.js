import React, { Component } from 'react';
import { IndexRoute, Route, Link } from 'react-router-dom';

class FarmGoodsCard extends Component {
  constructor(){
    super()

    this.state = {
      likes: 0,
    }
  }

  handleLike = () => {
    this.setState({
      likes: this.state.likes+1 
    })
  }

  handleDislike = () => {
    if (this.state.likes === 0) {
      alert('cannot be any worse')
    } else {
    this.setState({
      likes: this.state.likes-1 
    })
  }
  }


  render(){
    const {isEditing, farmGood} = this.props
    
    return (<div key={farmGood.id} className="FarmGoodsCard" >
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
      
  <button onClick={() => {this.handleLike()} }>Like?</button>

<button onClick={() => {this.handleDislike()
}}>Dislike?</button>
<h4>{this.state.likes}</h4>
      
</div>)
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