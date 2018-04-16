const orders = "http://localhost:3000/api/orders"
const farmer_orders = "http://localhost:3000/api/farmer_orders"

export const closeFarmerOrder = (order_id) => {
  return dispatch => {
    return fetch(`${farmer_orders}/${order_id}`, { 
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify({status: "change"})
    })
    .then(response => response.json())
    .then(farmerOrder => dispatch(setFarmerOrderClosedOrOpen(farmerOrder)))
    .catch(error => console.log(error));
  }
}

const setFarmerOrderClosedOrOpen = (farmerOrder) => {
  //debugger 
  farmerOrder = farmerOrder.data
  return {
    type: 'CHANGE_ORDER_STATUS_SUCCESS',
    farmerOrder
  }
}


//

export const getOpenFarmerOrders = (farmer_id) => {
  return dispatch => {
    return fetch(`${farmer_orders}`, { 
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(farmerOrders => dispatch(setOpenFarmerOrders(farmerOrders, farmer_id)))
    .catch(error => console.log(error));
  }
}

const setOpenFarmerOrders = (farmerOrders, farmer_id) => {
  const allFarmerOrders = []
  const closedFarmerOrders = []
  const openFarmerOrders = []
    //debugger 
    farmerOrders.data.map(order => {
    //debugger 
      if (order.relationships.farmer.data.id === farmer_id) {
        if (order.attributes.status === "open"){
          openFarmerOrders.push(order) 
        } else if (order.attributes.status === "closed") {
          closedFarmerOrders.push(order)
        }
      }
    })

    allFarmerOrders.push(openFarmerOrders)
    allFarmerOrders.push(closedFarmerOrders)

  //debugger 
  return {
    type: 'GET_FARMERORDERS_SUCCESS',
    allFarmerOrders
    //test
  }
}

const checkedOut = (order) =>{
  //debugger 
    return {
      type: 'CHECKOUT_SUCCESS',
      order
    }
  }
  
  export const checkingOutNow = (customer_user_id, cart_id) => {
    //debugger
    return dispatch => {
      return fetch('http://localhost:3000/api/orders', {
          headers: {
            'Access-Control-Allow-Origin':'',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ customerUserID: customer_user_id, cart_id: cart_id })
      })
      .then(response => response.json())
      .then(order => {
        //debugger 
        dispatch(checkedOut(order))
      })
    }
  }