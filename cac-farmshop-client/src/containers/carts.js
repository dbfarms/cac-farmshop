import React, { Component } from 'react';
import { connect } from 'react-redux';
import CartCardModal from '../components/CartCardModal';
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
      openLineitems: this.props.openLineitems,
      closedLineitems: this.props.closedLineitems,
      cart: this.props.cart 

    }
  }

  componentDidMount(){
    this.props.getLineItems(sessionStorage.id)
  }

  componentWillReceiveProps(nextProps){
    debugger
    if (nextProps.openLineitems != undefined ) {
      //debugger 
      this.setState({
        openLineitems: nextProps.openLineitems,
        closedLineitems: nextProps.closedLineitems,
        cart: nextProps.cart 
      })
    } else {
      //debugger 
      this.setState({
        openLineitems: nextProps.openLineitems,
        closedLineitems: nextProps.closedLineitems,
        cart: nextProps.cart 
      })
    }
  }

  renderOldLineItems = (oldlineitems) => {
    //debugger 
    return <div align="center" className="CartsContaine">
      {oldlineitems.map(li => {
      //debugger
      return <p>link to: {li.attributes.farmgood.name}</p>
    })}
    </div>
  }


  render() {
    //debugger 
    const oldlineitems = this.state.closedLineitems
    const currentLineItems = this.state.openLineitems
    //const oldLineItems = [] 
    //debugger 
    
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
          <CartCardModal cart={currentLineItems} total={0}  />
        </div>
        <div align="right">
          <h3>old orders / what you ate in the past</h3>
          {this.renderOldLineItems(oldlineitems)}
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
      openLineitems: state.openLineitems,
      closedLineitems: state.closedLineitems
  })
}

export default connect(mapStateToProps, { getLineItems })(Cart);


/*

if (lineitems != undefined ) {
        //debugger 
        lineitems.map(li => {
            debugger 
            if (li.attributes["cart-id"] === Number(this.state.cart.id)) {
                currentLineItems.push(li)
            } else {
                oldLineItems.push(li)
            }
        })
    }

*/