import React from 'react'

export default class CartCardDropDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openLineitems: this.props.openLineitems
    }
  }

  cartList() {
    return this.state.openLineitems.map((fg, keyIndex) => {
        return (
            <div>
                {keyIndex !== (this.state.openLineitems.length - 1) &&
                    <li className="nav__submenu-item">
                        {fg.attributes.farmgood.name} 
                        - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                        <button 
                            float="right" 
                            onClick={() => {this.deleteItem(fg)
                        }}>X</button>
                    </li>
                }
                {keyIndex === (this.state.openLineitems.length - 1) &&
                    <li className="nav__submenu-item">
                        {fg.attributes.farmgood.name} 
                        - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                        <button 
                            float="right" 
                            onClick={() => {this.deleteItem(fg)
                        }}>X</button>
                        Total: {this.state.total}
                        <a href="/checkout">
                            <button>Checkout</button>
                        </a>
                    </li>
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
