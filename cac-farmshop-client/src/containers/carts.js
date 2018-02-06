import React from 'react';
import './Carts.css';

const Carts = (props) => (
  <div className="CartsContainer">
    <h1>Carts </h1>
    {props.carts.map(cart => 
        <div key={cart.id} className="CartsCard">
            <h3>{cart.user_id}</h3>
            <img className="CartImage" src={cart.img_url} alt={cart.user_id} />
            <p>{cart.status}</p>
        </div>
    )}
  </div>
 );
 
 export default Carts;