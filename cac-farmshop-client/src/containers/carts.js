import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartCard from '../components/CartCard';
import { getLineItems } from '../actions/lineitems';

import './Carts.css';

class Cart extends Component {
  constructor(props){
    super(props)
    //debugger 

    this.state = {
      user_id: sessionStorage.id, 
      user_name: sessionStorage.name,
      //lineitems: undefined 
      lineitems: this.props.lineitems,
      cart: this.props.cart 

    }
  }

  componentDidMount(){
    this.props.getLineItems(sessionStorage.id)
  }

  componentWillReceiveProps(nextProps){
    //debugger
    this.setState({
      lineitems: nextProps.lineitems,
      cart: nextProps.cart 
    })
  }

  render() {
    //debugger 
    const lineitems = this.state.lineitems
    const currentLineItems = []
    const oldLineItems = [] 
    //debugger 
    if (lineitems.data ) {
        //debugger 
        lineitems.data.map(li => {
            //debugger 
            if (li.attributes["cart-id"] === Number(this.state.cart.id)) {
                currentLineItems.push(li)
            } else {
                oldLineItems.push(li)
            }
        })
    }
    return (
      <div>
      {this.state.lineitems === undefined &&
        <div>
          <p>loading</p>
        </div>
      }
      {this.state.lineitems != undefined &&
      <div className="CartsContainer">
        <div align="left">
          <h1>Cart </h1>
          <CartCard  cart={this.state.lineitems} />
        </div>
        <div align="right">
          <h3>old orders / what you ate in the past</h3>
        </div>
      </div>
      }
      </div>
   )
  }
}

const mapStateToProps = (state) => {
  //debugger 
  return ({
      lineitems: state.lineitems
  })
}

export default connect(mapStateToProps, { getLineItems })(Cart);
