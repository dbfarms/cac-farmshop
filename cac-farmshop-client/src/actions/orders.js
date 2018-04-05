const orders = "http://localhost:3000/api/orders"
const farmer_orders = "http://localhost:3000/api/farmer_orders"

export const getOpenFarmerOrders = (farmer_id) => {
  return dispatch => {
    return fetch(`${farmer_orders}`, { //////////////////////////////
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
  const openFarmerOrders = []
    //debugger 
    farmerOrders.data.map(order => {
    //debugger 
      if (order.relationships.farmer.data.id === farmer_id) {
        openFarmerOrders.push(order) 
      }
    })

  //debugger 
  return {
    type: 'GET_FARMERORDERS_SUCCESS',
    openFarmerOrders
    //test
  }
}

const checkedOut = (order) =>{
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
        dispatch(checkedOut())
      })
    }
  }