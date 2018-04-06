import React from 'react';

export const OrderCard = (order) => {
    //debugger 
    return order.order.attributes["farmer-line-items"].map((fli, keyIndex) => {
                //debugger 
        return ( <div key={keyIndex} className="orderCard">
            
            {keyIndex === 0 ? <label>Customer: {fli["customer-user"].email} </label> : <p>-------</p>}
            
            <label>Item: {fli.farmgood.name} - quantity: {fli.quantity}</label>
            <br />
            {keyIndex === order.order.attributes["farmer-line-items"].length - 1 ? <label>Total: {order.order.attributes.total} </label> : <p>-------</p>}
            </div>)
        })
}

/*

  {this.state.orders === '' ? <p>loading</p> : <p>loaded {console.log(this.state.orders)} </p> }


*/