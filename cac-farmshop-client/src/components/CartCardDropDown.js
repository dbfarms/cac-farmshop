import React from 'react'
import { getOpenLineItems } from '../actions/lineitems';
import {connect} from 'react-redux';  

class CartCardDropDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openLineitems: this.props.openLineitems,
      //total: 0
    }
  }

  handleHover(){
      //debugger 

  }

  componentWillMount(){
      //debugger 
    //this.props.getOpenLineItems();
  }


  componentWillReceiveProps(nextProps){
    //debugger 
    console.log("next props in carcarddropdown")
    if (sessionStorage.id === undefined) {
        this.setState({
            openLineitems: [],
            cart: [],
        })
        console.log(this.state.openLineitems)
    } else {
        this.setState({
            openLineitems: nextProps.openLineitems,
            cart: nextProps.cart 
            //oldLineItems: nextProps.allLineItems 
        })
    }
}

  cartList() {
    var total = 0;
    this.state.openLineitems.forEach(lineItem => total += (lineItem.attributes.farmgood.price * lineItem.attributes.quantity))

    return this.state.openLineitems.map((fg, keyIndex) => {
        return (
            <div key={keyIndex}>
                {keyIndex !== (this.state.openLineitems.length - 1) &&
                    <li 
                        className="nav__submenu-item_cart"
                        onMouseEnter={this.handleHover}
                    >
                        {fg.attributes.farmgood.name} 
                        - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                        <button 
                            float="right" 
                            className="subtractItem"
                            onClick={() => {this.props.deleteItem(fg)}}
                        >-</button>
                    </li>
                }
                {keyIndex === (this.state.openLineitems.length - 1) &&
                    <div>
                        <li className="nav__submenu-item_cart">
                            {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            <button 
                                className="subtractItem"
                                float="right" 
                                onClick={() => {this.props.deleteItem(fg)
                            }}>-</button>
                        </li>
                        <li className="nav__submenu-item">
                            <p>Total: {total}</p>
                            <a href="/checkout">
                                <button className="checkoutButton">Checkout</button>
                            </a>
                        </li>
                    </div>
                }
            </div>
        )
    })
  }

  render() {
    //debugger 

    const cartListMenu = this.cartList()
    if (this.state.openLineitems.length > 0 ) {
        //debugger
        return (
            <ul className="nav__submenu_cart">
                {cartListMenu}    
            </ul>
        )
    } else {
        return (
            <p>loading</p>
        )
    }

  }
}

const mapStateToProps = (state) => {
    //debugger 
    console.log("mapstatetoprops in carcarddropdown")
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems, 
    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems })(CartCardDropDown);