import React from 'react';

const CartCard = ({ cart }) =>

<div key={cart.id} className="CartsCard">
    <h3>{cart.id}</h3>
    <img className="CartImage" src={cart.img_url} alt={cart.user_id} />
    <p>{cart.status}</p>
</div>

export default CartCard
