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

  const showLineItems = (lineitems, user_id) => {
    //debugger 
    lineitems = lineitems.data.filter(li =>
      //debugger 
      li.attributes["customer-users"].id === Number(user_id)
    )
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
          'Content-Type': 'application/json',
        },
        //method: 'GET',
        //body: JSON.stringify({  user_id: user_id })
      })
      .then(response => response.json())
      .then(lineitems => {
        debugger 
        dispatch(showLineItems(lineitems, user_id))
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

