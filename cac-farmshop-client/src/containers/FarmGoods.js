import React, { Component } from 'react';
import { connect } from 'react-redux'
import FarmGoodsCard from '../components/FarmGoodsCard';
import { getFarmGoods } from '../actions/farmGoods'
import './Carts.css';

class FarmGoods extends Component {

  componentDidMount(){
    this.props.getFarmGoods()
  }

  render() {
    return (
      <div>
      <div className="Farm-Goods-Container">
        <h1>For sale: </h1>
          <p>place holder for comment below in code </p>
      </div>
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  return ({
      farmGoods: state.farmGoods
  })
}

export default connect(mapStateToProps, { getFarmGoods })(FarmGoods);


//{this.props.farmGoods.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} />)}

/*
import React from 'react';
import { connect } from 'react-redux'

//debugger

const FarmGoods = ({farmer}) =>

      <div>
        <h2>Available this Week</h2>
      </div>

const mapStateToProps = (state, ownProps) => {
  const farmer = state.farmers.find(farmer => farmer.id == ownProps.match.params.farmerId)

  if (farmer) {
    return { farmer }
  } else {
    return { farmer: {} }
  }
}

export default connect(mapStateToProps)(FarmGoods)

*/
