const orders = "http://localhost:3000/api/orders"

export const getOpenFarmerOrders = (farmer_id) => {
  return dispatch => {
    return fetch(`${orders}`, { //////////////////////////////
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(orders => dispatch(setOrders(orders, farmer_id)))
    .catch(error => console.log(error));
  }
}

const setOrders = (orders, farmer_id) => {
  const openFarmerOrders = orders.data.map(order => {
    debugger 
    const farmersGoods = order.attributes.farmgoods.filter(fg => (fg.farmer_id === Number(farmer_id)))

    //return order.attributes["line-items"].filter(fg => (fg.))
  })

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