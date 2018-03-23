export const addAnotherToCart = (farmgood_id, user_id) => {
  
  return dispatch => {
      return fetch('http://localhost:3000/api/line_items', {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ farmgood_id: farmgood_id, user_id: user_id })
    })
    .then(response => response.json())
    .then(lineitem => {
      dispatch(addQuantityToCart(lineitem))
    })
    .catch(error => console.log(error))
  }
}

const addQuantityToCart = (lineitem) => {
  return {
    type: 'ADD_QUANTITY_CART_SUCCESS',
    lineitem
  }
}

export const addFarmgoodToCart = (farmgood_id, user_id) => {
    //debugger 
    
    return dispatch => {
        return fetch('http://localhost:3000/api/line_items', {
        headers: {
          'Access-Control-Allow-Origin':'',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ farmgood_id: farmgood_id, user_id: user_id })
      })
      .then(response => response.json())
      .then(lineitem => {
        dispatch(addToCart(lineitem))
      })
      .catch(error => console.log(error))
    }
}

const addToCart = (lineitem) => {
  return {
    type: 'ADD_TO_CART_SUCCESS',
    lineitem
  }
}

const showLineItems = (lineitems, user_id, cart) => {
  //debugger 
  /*
  const userLineItems = lineitems.data.filter(li =>
    //debugger 
    li.attributes["cart-id"] !== Number(cart.id)
  )

  lineitems = lineitems.data.filter(li =>
    //debugger 
    li.attributes["cart-id"] === Number(cart.id)
  )
  */
  //debugger 
  return {
    type: 'GET_LINEITEM_SUCCESS',
    lineitems,
    //userLineItems
  }
}

/////

let header = new Headers({
  'Access-Control-Allow-Origin':'',
  'Content-Type': 'multipart/form-data',
  'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
});

export const getAllLineItems = (user_id) => {
  return dispatch => {
    return fetch ('http://localhost:3000/api/line_items', header)
      .then(response => response.json())
      .then(lineitems => dispatch(setUserLineItems(lineitems, user_id)))
      .catch(error => console.log(error));
  }
}

const setUserLineItems = (lineitems, user_id) => {
  //debugger 
  const userLineItems = lineitems.data.filter(li => li.attributes.cart["customer_user_id"] === Number(user_id) )
  return {
    type: 'GET_ALL_USER_LINEITEMS',
    userLineItems
  }
}

///

const setCart = (carts, user_id) => {
  //debugger
  const userCarts = carts.data.filter(cart => cart.attributes["customer-user-id"] === Number(user_id))
  //debugger 
  const current_cart = userCarts[userCarts.length - 1]
  return {
    type: 'GET_CART_SUCCESS',
    current_cart
  }
}

export const getCart = (user_id) => {
  //debugger
  return dispatch => {
    return fetch('http://localhost:3000/api/carts', header)
      //fetch(`${API_URL}/carts`)
      .then(response => response.json())
      .then(carts => dispatch(setCart(carts, user_id)))
      .catch(error => console.log(error));
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
          'Content-Type': 'application/json',
        },
        //method: 'GET',
        //body: JSON.stringify({  user_id: user_id })
      })
      .then(response => response.json())
      .then(lineitems => {
        //debugger 
        dispatch(getCart(sessionStorage.id))
        .then(response =>  { // {debugger}
        //debugger 
        dispatch(showLineItems(lineitems, user_id, response.current_cart))
        })
      })
      .catch(error => console.log(error))
    }
}

const deleteLineItem = (lineItemId) =>{
  //debugger 
  return {
    type: 'DELETE_LINEITEM_SUCCESS',
    lineItemId 
  }
}

export const removeLineItem = (lineItemId) => {
  //debugger
  return dispatch => {
    return fetch(`http://localhost:3000/api/line_items/${lineItemId}`, {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: 'DELETE'
    })
    .then(() => {
      dispatch(deleteLineItem(lineItemId))
    })
  }
}

///

