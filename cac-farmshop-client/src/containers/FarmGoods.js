import React, { Component } from 'react';
import { connect } from 'react-redux'
import FarmGoodsCard from '../components/FarmGoodsCard';
import { getFarmGoods } from '../actions/farmGoods'
import FarmgoodForm from './FarmgoodForm';
import './FarmGoods.css';

class FarmGoods extends Component {

  componentDidMount(){
    //debugger
    this.props.getFarmGoods()
  }

  //  {this.props.farmGoods.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} />)}

  render() {
    return (
      <div>
        <div className="Farm-Goods-Container">
          <h1>For sale: </h1>
          {this.props.farmGoods.map(farmGood => <FarmGoodsCard  key={farmGood.id} farmGood={farmGood} />)}
        </div>
        <FarmgoodForm />
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return ({
      farmGoods: state.farmGoods
  })
}

export default connect(mapStateToProps, { getFarmGoods })(FarmGoods);
