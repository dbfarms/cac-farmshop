const line_items = "http://localhost:3000/api/line_items"
const farmer_line_items = "http://localhost:3000/api/farmer_line_items"

let header = new Headers({
  'Access-Control-Allow-Origin':'',
  'Content-Type': 'multipart/form-data',
  'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
});

export const getFarmerLineItems = (farmer_id) => {
  return dispatch => {
    return fetch(`${farmer_line_items}`, {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(farmer_line_items => dispatch(setFarmerLineItems(farmer_line_items, farmer_id)))
    .catch(error => console.log(error));
  }
}

const setFarmerLineItems = (farmer_line_items, farmer_id) => {
  //debugger 
  const farmerLineItems = []
  const openFarmerLineItems = []
  const closedFarmerLineItems = []

  farmer_line_items.data.map(li => {
    //debugger 
    if (li.attributes.farmer.id === Number(farmer_id)) {
      //debugger 
      if (li.attributes["farmer-order"].status === "closed") {
        //closedFarmerOrders
          closedFarmerLineItems.push(li)
      } else {
          openFarmerLineItems.push(li)
      }
    }

  })

  farmerLineItems.push(openFarmerLineItems)
  farmerLineItems.push(closedFarmerLineItems)

  //debugger 

  return {
    type: 'GET_FARMERLINEITEMS_SUCCESS',
    farmerLineItems
    //test
  }
}



// not sure if i'm using this or if i'm using the one in orders actions
export const getFarmerOrders = (farmer_id) => {
  return dispatch => {
    return fetch(`${line_items}`, {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(line_items => dispatch(setOrders(line_items, farmer_id)))
    .catch(error => console.log(error));
  }
}

const setOrders = (line_items, farmer_id) => {
  //debugger 
  const closedFarmerOrders = []
  const openFarmerOrders = []
  line_items.data.map(li => {
    //debugger 
    if (li.attributes.farmer.id === Number(farmer_id)) {
      if (li.attributes.cart.status === "submitted") {
        closedFarmerOrders
      } else if (li.attributes.cart.status === "not submitted") {
        debugger 
      }
    }

  })

  return {
    type: 'GET_FARMERORDERS_SUCCESS',
    openFarmerOrders
    //test
  }
}

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

/////////////////////////////////////////////////////////////

const showOpenLineItems = (lineitems, user_id, cart) => {

  const openLineitems = lineitems.data.filter(li =>
    li.attributes["cart-id"] === Number(cart.id)
  )
  //debugger 
  return {
    type: 'GET_LINEITEM_SUCCESS',
    openLineitems
  }
}

const showNoLineItems = () => {
  //debugger 
  const openLineitems = []
  //debugger 
  return {
    type: 'GET_LINEITEM_SUCCESS',
    openLineitems
  }
}

const showClosedLineItems = (gotLineitems, cart) => {
  //debugger 
  const closedLineitems = gotLineitems.data.filter(li =>
    li.attributes["cart-id"] !== Number(cart.id)
  )
  //debugger 
  return {
    type: 'GET_ALL_LINEITEMS_SUCCESS',
    closedLineitems
  }
}

export const getClosedLineItems = (user_id) => {
  //debugger 
  return dispatch => {
      return fetch('http://localhost:3000/api/line_items', {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(gotLineitems => {
      //debugger 
      dispatch(getCart(sessionStorage.id))
      .then(response =>  { // {debugger}
      dispatch(showClosedLineItems(gotLineitems, response.current_cart))
      })
    })
    .catch(error => console.log(error))
  }
}

export const getOpenLineItems = (user_id) => {
  //debugger 
  return dispatch => {
      return fetch('http://localhost:3000/api/line_items', {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(lineitems => {
      //debugger 
      dispatch(getCart(sessionStorage.id))
      .then(response =>  {  //{debugger}
      //debugger 
    
        dispatch(showOpenLineItems(lineitems, user_id, response.current_cart))//,
      //dispatch(showClosedLineItems(lineitems, user_id, response.current_cart))
      })
    })
    .catch(error => console.log(error))
  }
}

/////////////////////////////////////////////////////////////

export const getAllLineItems = (user_id) => {
  return dispatch => {
    return fetch ('http://localhost:3000/api/line_items', header)
      .then(response => response.json())
      .then(lineitems => { 
        dispatch(getCart(sessionStorage.id))
        .then(response => {
          dispatch(setAllUserLineItems(lineitems, response.current_cart))
        })
      })
      //.then(lineitems => dispatch(setAllUserLineItems(lineitems, user_id)))
      .catch(error => console.log(error));
  }
}



/*
const setUserLineItems = (lineitems, user_id) => {
  debugger 
  const userLineItems = lineitems.data.filter(li => li.attributes.cart["customer_user_id"] === Number(user_id) )
  debugger 
  return {
    type: 'GET_ALL_USER_LINEITEMS',
    userLineItems
  }
}
*/

const setAllUserLineItems = (lineitems, cart) => {
  //debugger 
  const user_id = Number(sessionStorage.id)
  var allUserLineItems = lineitems.data.filter(li => li.attributes["customer-users"].id === user_id)
  var allLineItems = []
  var openLineitems = []
  var closedLineitems = []
  //debugger 
  allUserLineItems.map(li => {
    //debugger 
    if (li.attributes.cart.id === Number(cart.id)) {
      openLineitems.push(li)
    } else {
      closedLineitems.push(li)
    }
  })
  allLineItems.push(openLineitems)
  allLineItems.push(closedLineitems)
  //allLineItems[0] = lineitems.data.filter(li => li.attributes.cart["customer_user_id"] === Number(cart.id) )
  //allLineItems[1] = 
  return {
    type: 'GET_ALL_USER_LINEITEMS',
    allLineItems
  }
}

/////////////////////////////////////////////////////////////

const setCart = (carts, user_id) => {
  //debugger
  if (user_id != undefined ) {
    const userCarts = carts.data.filter(cart => cart.attributes["customer-user-id"] === Number(user_id))
    //debugger 
    const current_cart = userCarts[userCarts.length - 1]
    return {
      type: 'GET_CART_SUCCESS',
      current_cart
    }
  } else {
    const current_cart = []
    return {
      type: 'GET_CART_SUCCESS',
      current_cart
    }
  }
}

export const getCart = (user_id) => {
  //debugger
  //if (sessionStorage.jwt != "undefined"){
    return dispatch => {
      return fetch('http://localhost:3000/api/carts', header)
        //fetch(`${API_URL}/carts`)
        .then(response => response.json())
        .then(carts => dispatch(setCart(carts, user_id)))
        .catch(error => console.log(error));
    }
  //} else {
    //debugger 
  //  const cart = []
  //  return cart
 // }
}

///////////////////////////////

const deleteLineItem = (lineItemId, initialQuantity) =>{
  //debugger 
  return {
    type: 'DELETE_LINEITEM_SUCCESS',
    lineItemId,
    initialQuantity
  }
}


export const removeLineItem = (lineItemId, initialQuantity) => {
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
      dispatch(deleteLineItem(lineItemId, initialQuantity))
    })
  }
}

///

