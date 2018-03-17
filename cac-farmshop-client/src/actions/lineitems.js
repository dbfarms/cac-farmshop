export const addFarmgoodToCart = (farmgood_id, cart) => {
    //debugger 
    const cart_id = Number(cart.id) 
    return dispatch => {
      //return fetch(`http://localhost:3000/api/carts/${cart_id}`, {
        return fetch('http://localhost:3000/api/line_items', {
        headers: {
          'Access-Control-Allow-Origin':'',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ cart_id: cart.id, farmgood_id: farmgood_id })
      })
      .then(response => response.json())
      .then(lineitem => {
        dispatch(addToCart(lineitem, cart))
      })
      .catch(error => console.log(error))
    }
}

  const addToCart = (lineitem, cart) => {
    //debugger 

    return {
      type: 'ADD_TO_CART_SUCCESS',
      lineitem,
      cart 
    }
  }

  //

  const showLineItems = (lineitems) => {
    return {
      type: 'GET_LINEITEM_SUCCESS',
      lineitems
    }
  }

  export const getLineItems = (user_id) => {
    //debugger 
    //const cart_id = Number(cart.id) 
    return dispatch => {
      //return fetch(`http://localhost:3000/api/carts/${cart_id}`, {
        return fetch('http://localhost:3000/api/line_items', {
        headers: {
          'Access-Control-Allow-Origin':'',
          'Content-Type': 'application/json'
        },
        //method: "GET",
        //body: JSON.stringify({ cart_id: cart.id, farmgood_id: farmgood_id })
      })
      .then(response => response.json())
      .then(lineitems => {
        dispatch(showLineItems(lineitems))
      })
      .catch(error => console.log(error))
    }
}
