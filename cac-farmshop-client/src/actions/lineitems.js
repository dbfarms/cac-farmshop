export const addFarmgoodToCart = (farmgood_id, cart_id) => {
    //debugger 
    return dispatch => {
      //return fetch(`http://localhost:3000/api/carts/${cart_id}`, {
        return fetch('http://localhost:3000/api/line_items', {
        headers: {
          'Access-Control-Allow-Origin':'',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ cart_id: cart_id, farmgood_id: farmgood_id })
      })
      .then(response => response.json())
      .then(cart => {
        dispatch(addToCart(cart_id, farmgood_id))
      })
      .catch(error => console.log(error))
    }
  }

  const addToCart = (cart_id, farmgood_id) => {
    debugger 
    return {
      type: 'ADD_TO_CART_SUCCESS',
      cart_id,
      farmgood_id
    }
  }