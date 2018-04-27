import React, {Component } from 'react';
//import { Redirect } from 'react-router'
import EditFarmgoodForm from '../containers/EditFarmgoodForm';
import { getSingleFarmGood } from '../actions/farmGoods';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux'

class FarmGoodCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      farmGood: {
        attributes: {
          name: null,
          price: null,
          inventory: null,
        },
        relationships: {
          days: {
            data: []
          }
        }
      }
    }

  }

  componentWillMount(){
      var id = this.props.location.pathname.split('/')
      var index = (id.length - 1)
      this.props.getFarmGood(id[index]);
  }

  
  componentWillReceiveProps(nextProps){
    this.setState({
      farmGood: nextProps.farmGood.data
    })
  }
  

  daysAvailable = () => {
    
    //debugger
    if (this.state.farmGood.relationships !== undefined ){
      var days = this.state.farmGood.relationships.days.data //this.props.farmGood.data.relationships.days.data 

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
    //debugger
    const displayDays = this.daysAvailable();
    return (
      <div className="FarmGoodsCard" >
      
      {//props.location.farmGood !== undefined &&
        <div>
        <h4>{this.state.farmGood.attributes.name}</h4>
        <img className="farmGoodImage" src={this.state.farmGood.img_url} alt={this.state.farmGood.id} />
        { this.state.farmGood.attributes.inventory > 0 &&
        <p>Available: {this.state.farmGood.attributes.inventory} at ${this.state.farmGood.attributes.price} each</p>
        }

        {this.props.farmGood.attributes <= 0 &&
          <p>No longer available. Check back soon</p>
        }
        <h3>Days Available</h3>
        <ul>{displayDays}</ul>
        <br />

        <Link to={{
            pathname: `/farm-goods/${this.props.farmGood.id}/edit`,
            farmGood: this.props.farmGood
        }}> edit farmgood </Link>

        </div>
      }
      </div>
    )
  }
}
 
const mapStateToProps = (state, ownProps) => {
  return ({
      farmGood: state.farmGood,
  })
}

export default connect(mapStateToProps, { getSingleFarmGood })(FarmGoodCard); // 

// export default FarmGoodCard



/*



<div className="FarmGoodsCard" >
{ /*
{props.farmGood === undefined && // 
  <div>
  {console.log('redirecting from farmgoods card page') }
  <Redirect to="/farm-goods" />
  </div>

} /}
{//props.farmGood !== undefined &&
  <div>
  <h4>{props.farmGood.name}</h4>
  <img className="farmGoodImage" src={props.farmGood.img_url} alt={props.farmGood.id} />
  { props.farmGood.inventory > 0 &&
  <p>Available: {props.farmGood.inventory} at ${props.farmGood.price} each</p>
  }

  {props.farmGood.attributes <= 0 &&
    <p>No longer available. Check back soon</p>
  }

  


  <Link to={{
      pathname: `/farm-goods/${props.farmGood.id}/edit`,
      farmGood: props.farmGood
  }}> edit farmgood </Link>
  <button onClick={() => {

  }}>Like?</button>

  <button onClick={() => {

}}>Dislike?</button>
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