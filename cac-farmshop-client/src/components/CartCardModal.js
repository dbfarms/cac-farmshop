import React from 'react'
import { Link } from 'react-router-dom';  


const totalCost = (currentLineItems) =>{
//debugger 
    if (currentLineItems !== undefined ){
        var total = 0 
        currentLineItems.cart.forEach(li => total += (li.attributes.farmgood.price * li.attributes.quantity))
        return total //debugger 
    }
}

const CartCardModal = (currentLineItems, total=0) => 
    <div className="CartsCard">
        <p>{sessionStorage.name}</p>
        <img className="CartImage"  />

        {currentLineItems !== [] && 
            (currentLineItems.cart.map(li => <p>
                {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
                <button onClick={() => this.deleteItem(li)}>X</button>
            </p>)
        )}
        {currentLineItems !== [] &&
            <p>Total: {totalCost(currentLineItems)}</p>
        }

        <label>Total: {totalCost()}</label>
        <Link to="/checkout">
            <button>Checkout</button>
        </Link>
    </div>

export default CartCardModal

/*

<div className="CartsCard">
        <p>{sessionStorage.name}</p>
        <img className="CartImage"  />

        {currentLineItems !== [] && 
            (currentLineItems.map(li => <p>
                {li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}
                <button onClick={() => this.deleteItem(li)}>X</button>
            </p>)
        )}
        {currentLineItems !== "" &&
            (currentLineItems.forEach(li => total += (li.attributes.farmgood.price * li.attributes.quantity))
        )}

        <label>Total: {total}</label>
        <Link to="/checkout">
            <button>Checkout</button>
        </Link>
    </div>

*/