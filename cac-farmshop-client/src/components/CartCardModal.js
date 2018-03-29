import React from 'react'
import { Link } from 'react-router-dom';  


const totalCost = (currentLineItems) =>{
debugger 
    var total = 0

    if (currentLineItems !== undefined ){
        currentLineItems.openLineitems.forEach(li => total += (li.attributes.farmgood.price * li.attributes.quantity))
         //debugger 
    }
    return total

}

const CartCardModal = (currentLineItems, total=0) => 
    //debugger
    <div className="CartsCard">
        <p>{sessionStorage.name}</p>
        <img className="CartImage"  />
        <p>{console.log(currentLineItems)}</p>
        {currentLineItems.openLineitems !== [] && 
            
            (currentLineItems.openLineitems.map(li => <p>
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