import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFarmgoodToCart } from '../actions/lineitems';
import { addAnotherToCart } from '../actions/lineitems';
import { NavLink, Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';

class FarmGoodModal extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      openLineItems: this.props.openLineitems,
      showFGMenu: true,
      farmgoodscard: "FarmGoodsCard",
    }
  }

  componentWillMount(){
    if (this.props.farmgoodscard) {
      this.setState({
        farmgoodscard: this.props.farmgoodscard
      })
    }
  }

  daysAvailable = () => {
    if (this.props.farmGood.relationships !== undefined ){
      var days = this.props.farmGood.relationships.days.data //this.props.farmGood.data.relationships.days.data 

      var daysArray = days.sort(function(a, b) {
        return a.id - b.id;
      });

      return daysArray.map((day, index)=> {
        return (
          <div key={index}>
            <li>{day.name}</li>
          </div>
        )
      })
    }
  }

  fgMenu = (event) => {
    this.setState({ showFGMenu: true })
  }

  render() {
    const displayDays = this.daysAvailable();
    const farmGood = this.props
    //debugger 
    return (
      <div>
      {
        <div>
          <MediaQuery query="(min-width: 366px)" > 
            <div className={this.state.farmgoodscard}>
              <span onMouseLeave={this.fgReg}>
                <div onMouseEnter={this.fgMenu}>
                  <a href={"http://localhost:3001/farmers/" + farmGood.farmGood.attributes.farmer.id + "/farmgoods/" + farmGood.farmGood.id}><img className="fgcardImg" src={farmGood.farmGood.attributes["img-url"]} alt={farmGood.farmGood.img_url}/></a>
                  <span>{farmGood.farmGood.attributes.name}</span>
                  <p>Available: {farmGood.farmGood.attributes.inventory} at ${farmGood.farmGood.attributes.price} each</p>
                  <a href={farmGood.farmGood.attributes.farmer.link}>{farmGood.farmGood.attributes.farmer.name}</a>
                  {farmGood.farmGood.attributes.inventory > 0 && //
                    <div>
                      {this.state.showFGMenu &&
                        <div>
                          <Link to={{
                              pathname: `/farm-goods/${this.props.farmGood.id}/edit`,
                              farmGood: this.props.farmGood
                          }}> edit farmgood </Link>
                        </div>
                      }
                    </div>
                  }
                  {farmGood.farmGood.attributes.inventory <= 0 &&
                    <p>None left, check back soon!</p>
                  }
                </div>
              </span>
              <div className="fg-li"></div>
            </div>
          </MediaQuery>
          <MediaQuery query="(max-width: 365px)" > 
            <div className="smallFarmGoodsCard">
              <span onMouseLeave={this.fgReg}>
                <div onMouseEnter={this.fgMenu}>
                  <a href={"http://localhost:3001/farmers/" + farmGood.farmGood.attributes.farmer.id + "/farmgoods/" + farmGood.farmGood.id}><img className="smallfgcardImg" src={farmGood.farmGood.attributes["img-url"]} alt={farmGood.farmGood.img_url}/></a>
                </div>
                  <span>{farmGood.farmGood.attributes.name}</span>
                  <p>${farmGood.farmGood.attributes.price}</p>
                  {farmGood.farmGood.attributes.inventory > 0 && //
                    <div>
                      {this.state.showFGMenu &&
                        <div>
                          <Link to={{
                              pathname: `/farm-goods/${this.props.farmGood.id}/edit`,
                              farmGood: this.props.farmGood
                          }}> edit farmgood </Link>
                        </div>
                      }
                    </div>
                  }
                  {farmGood.farmGood.attributes.inventory <= 0 &&
                    <p>Check back soon!</p>
                  }
              </span>
              <div className="fg-li"></div>
            </div>
          </MediaQuery>
        </div>
      }
    </div>
    )
  }
}


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
