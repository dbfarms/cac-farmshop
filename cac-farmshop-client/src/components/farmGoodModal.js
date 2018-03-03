import React from 'react';
import SkyLight from 'react-skylight';
import { Link } from 'react-router-dom'

class FarmGoodModal extends React.Component {
  constructor(props){
    super(props);
  }

  daysAvailable = () => {
    
    //debugger
    if (this.props.farmGood.relationships !== undefined ){
      var days = this.props.farmGood.relationships.days.data //this.props.farmGood.data.relationships.days.data 

      var daysArray = days.sort(function(a, b) {
        return a.id - b.id;
      });

      return daysArray.map(day=> {
        return (
          <li>{day.name}</li>
        )
      })
    }
  }

  render() {
    const displayDays = this.daysAvailable();
    const farmGood = this.props
    //debugger 
    return (
      <div>
        <button className="FarmGoodsCard" onClick={() => this.simpleDialog.show()}>
          <p>{farmGood.farmGood.attributes.name}</p>
          <p>image of farmgood here</p>
        </button>
        <SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={this.props.farmGood.attributes.name}>
          <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
          {farmGood.farmGood.attributes.inventory > 0 && //
          <div>
          <p>Available: {farmGood.farmGood.attributes.inventory} at ${farmGood.farmGood.attributes.price} each</p>
          </div>
          }
          {farmGood.farmGood.attributes.inventory <= 0 &&
            <p>No longer available. Check back soon</p>
          }
          {displayDays}
          <Link to={{
            pathname: `/farm-goods/${this.props.farmGood.id}/edit`,
            farmGood: this.props.farmGood
        }}> edit farmgood </Link>
        </SkyLight>
      </div>
    )
  }
}

FarmGoodModal.displayName = 'FarmGoodmodal';

export default FarmGoodModal;

/*

import React, { Component } from 'react';
import { IndexRoute, Route, Link } from 'react-router-dom';

class FarmGoodsCard extends Component {
  constructor(){
    super()

  }

  
  render(){
    const {isEditing, farmGood} = this.props
    
    return (<button key={farmGood.id} className="FarmGoodsCard"  onClick={() => isEditing(farmGood) }>
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
