import React from 'react';
import SkyLight from 'react-skylight';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFarmgoodToCart } from '../actions/lineitems';
import { addAnotherToCart } from '../actions/lineitems';
import { NavLink } from 'react-router-dom';

class CustomerFarmGoodModal extends React.Component {
  constructor(props){
    super(props);
    //debugger 

    this.state = {
      openLineItems: this.props.openLineitems,
      showFGMenu: false
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

  addToCart(event){
    event.preventDefault();
    //debugger
    //const cart = this.props.cart 
    //const cart_id = Number(this.props.cart.id)
    const farmGood_id = Number(this.props.farmGood.id)
    const user_id = Number(sessionStorage.id)
    //debugger 
    var newItem = true 
      //debugger 
      this.props.lineitems.map(li => {
        //debugger 
        if (li.attributes.farmgood.id === farmGood_id) {
          newItem = false 
          if (this.props.farmGood.attributes.inventory === li.attributes.quantity) {
            alert('you are trying to buy more than is available!')
          } else {
            this.props.addAnotherToCart(farmGood_id, user_id)
          }
        }
      })
      if (newItem === true ) {
        //debugger 
        this.props.addFarmgoodToCart(farmGood_id, user_id)
      }
  }

  fgMenu = (event) => {
    this.setState({ showFGMenu: true })
  }

  fgReg = (event) => {
    this.setState({ showFGMenu: false });
  };

  addFG = () => {
    //debugger
    return (
      <div>
        <button onClick={this.addToCart.bind(this)}> Add To Cart </button>
      </div>
    )
  }


  render() {
    const displayDays = this.daysAvailable();
    const farmGood = this.props
    
    //debugger 
    return (
      <div>
      <li onMouseLeave={this.fgReg}>
        <div className="FarmGoodsCard" onMouseEnter={this.fgMenu}>
          <img src={farmGood.farmGood.attributes["img-url"]} alt={farmGood.farmGood.img_url}/>
          <span>{farmGood.farmGood.attributes.name}</span>
          <p>Available: {farmGood.farmGood.attributes.inventory}</p>
          <p>{farmGood.farmGood.attributes.details}</p>
          <a href={farmGood.farmGood.attributes.farmer.link}>{farmGood.farmGood.attributes.farmer.name}</a>
          {farmGood.farmGood.attributes.inventory > 0 && //
          <div>
            <p>Available: {farmGood.farmGood.attributes.inventory} at ${farmGood.farmGood.attributes.price} each</p>
            {this.state.showFGMenu &&
              <div>
                {this.addFG()}
              </div>
            }
          </div>
          }
          {farmGood.farmGood.attributes.inventory <= 0 &&
            <p>No longer available. Check back soon</p>
          }
        </div>
      </li>
      <div className="fg-li"></div>
      </div>
    )
  }
}

CustomerFarmGoodModal.displayName = 'CustomerFarmGoodmodal';

const mapStateToProps = state => {
    return {
      farmgood: state.farmgood,
      openLineitems: state.openLineitems
    }
}
  
  
export default connect(mapStateToProps, { addFarmgoodToCart, addAnotherToCart })(CustomerFarmGoodModal);


/*
<SkyLight hideOnOverlayClicked ref={ref => this.simpleDialog = ref} title={this.props.farmGood.attributes.name}>
          <img className="farmGoodImage" src={farmGood.img_url} alt={farmGood.user_id} />
          {farmGood.farmGood.attributes.inventory > 0 && //
            <div>
              <p>Available: {farmGood.farmGood.attributes.inventory} at ${farmGood.farmGood.attributes.price} each</p>
              <button onClick={this.addToCart.bind(this)}> Add To Cart </button>
            </div>
          }
          {farmGood.farmGood.attributes.inventory <= 0 &&
            <p>No longer available. Check back soon</p>
          }
          {displayDays}
          
        </SkyLight>

*/
