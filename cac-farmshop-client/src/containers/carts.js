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
      lineitems: this.props.lineitems,
      cart: this.props.cart 

    }
  }

  componentDidMount(){
    this.props.getLineItems(sessionStorage.id)
  }

  componentWillReceiveProps(nextProps){
    //debugger
    if (nextProps.lineitems != undefined ) {
      //debugger 
      this.setState({
        lineitems: nextProps.lineitems,
        userlineitems: nextProps.userlineitems,
        cart: nextProps.cart 
      })
    } else {
      //debugger 
      this.setState({
        lineitems: nextProps.lineitems,
        userlineitems: nextProps.lineitems,
        cart: nextProps.cart 
      })
    }
  }

  renderOldLineItems = (oldlineitems) => {
    return <div align="center" className="CartsContaine">
      {oldlineitems.map(li => {
      //debugger
      return <p>link to: {li.attributes.farmgood.name}</p>
    })}
    </div>
  }


  render() {
    //debugger 
    const oldlineitems = this.state.userlineitems
    const currentLineItems = this.state.lineitems
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
      lineitems: state.lineitems[0],
      userlineitems: state.lineitems[1]
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