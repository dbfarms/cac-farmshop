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
    //console.log("next props in carcarddropdown")
    if (sessionStorage.id === undefined) {
        this.setState({
            openLineitems: [],
            cart: [],
        })
        //console.log(this.state.openLineitems)
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
                    <div>
                    {keyIndex === 0 &&
                        <div>
                            <button
                                float="left"
                                className="addSubtractItem"
                                onClick={() => {this.props.addItem(fg)}}
                            >+</button>
                        </div> 
                    }
                    <div 
                        className="nav__submenu-item_cart"
                        onMouseEnter={this.handleHover}
                    >
                        {fg.attributes.farmgood.name} 
                        - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                        <button 
                            float="right" 
                            className="addSubtractItem"
                            onClick={() => {this.props.deleteItem(fg)}}
                        >-</button>
                    </div>
                    </div>
                }
                {keyIndex === (this.state.openLineitems.length - 1) &&
                    <div>
                        <div className="nav__submenu-item_cart">
                            {fg.attributes.farmgood.name} 
                            - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                            <button 
                                className="subtractItem"
                                float="right" 
                                onClick={() => {this.props.deleteItem(fg)
                            }}>-</button>
                        </div>
                        <div className="nav__submenu-item">
                            <p>Total: {total}</p>
                            <a href="/checkout">
                                <button className="checkoutButton">Checkout</button>
                            </a>
                        </div>
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
            <div className="navcart">
                {cartListMenu}    
            </div>
        )
    } else {
        return (
            <p>loading</p>
        )
    }

  }
}

const mapStateToProps = (state) => {
    //console.log("mapstatetoprops in carcarddropdown")
    //debugger 
    return ({
        cart: state.cart,
        openLineitems: state.openLineitems, 
    })
  }
  
  export default connect(mapStateToProps, { getOpenLineItems })(CartCardDropDown);