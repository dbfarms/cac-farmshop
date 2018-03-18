import React from 'react';

const CartCard = ( lineitems ) => {
    //debugger
    var total = 0;
    return (
    <div className="CartsCard">
    <h3>{sessionStorage.name}</h3>
    <img className="CartImage"  />
    {lineitems.cart !== "" &&
        (lineitems.cart.map(li => <p>{li.attributes.farmgood.name} - {li.attributes.quantity} at ${li.attributes.farmgood.price}</p>)
    )}
    {lineitems.cart !== "" &&
        (lineitems.cart.forEach(li => total += li.attributes.farmgood.price)
    )}
    <label>Total: {total}</label>
    </div>
    
)}



export default CartCard


/*

<div className="CartsCard">
    <h3>{sessionStorage.name}</h3>
    <img className="CartImage"  />
    {lineitems !== [] &&
        (lineitems.map(li => <p>{li.attributes.farmgood.name} - {li.attributes.quantity} at </p>))
    }
    
</div>

src={lineitems.img_url} alt={cart.user_id}


const listLineItems = ({lineitems}) => {
    return (lineitems.map(li => <p>{li.attributes.farmgood.name} - {li.attributes.quantity} at </p>))
}
*/
