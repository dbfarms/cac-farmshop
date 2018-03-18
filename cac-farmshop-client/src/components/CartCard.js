import React from 'react';

const CartCard = ( lineitems ) => {
    debugger
    return (
    <div className="CartsCard">
    <h3>{sessionStorage.name}</h3>
    <img className="CartImage"  />
    {lineitems.cart !== "" &&
        (lineitems.cart.map(li => <p>{li.attributes.farmgood.name} - {li.attributes.quantity} at </p>))
    }
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
