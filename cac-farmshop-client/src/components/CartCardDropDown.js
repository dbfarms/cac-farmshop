import React from 'react'

export default class CartCardDropDown extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      openLineitems: this.props.openLineitems,
      total: 0
    }
  }

  cartList() {
    var total = 0;
    this.state.openLineitems.forEach(lineItem => total += (lineItem.attributes.farmgood.price * lineItem.attributes.quantity))

    return this.state.openLineitems.map((fg, keyIndex) => {
        return (
            <div>
                {keyIndex !== (this.state.openLineitems.length - 1) &&
                    <li className="nav__submenu-item">
                        {fg.attributes.farmgood.name} 
                        - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                        <button 
                            float="right" 
                            onClick={() => {this.props.deleteItem(fg)
                        }}>X</button>
                    </li>
                }
                {keyIndex === (this.state.openLineitems.length - 1) &&
                    <div>
                    <li className="nav__submenu-item">
                        {fg.attributes.farmgood.name} 
                        - {fg.attributes.quantity} at ${fg.attributes.farmgood.price}
                        <button 
                            float="right" 
                            onClick={() => {this.props.deleteItem(fg)
                        }}>X</button>
                    </li>
                    <li className="nav__submenu-item">
                        <p>Total: {total}</p>
                        <a href="/checkout">
                            <button>Checkout</button>
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
