const checkedOut = (order) =>{
    //debugger
    //lineitems = [] 
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
      /*.then(() => {
        return fetch (`http://localhost:3000/api/carts/`, {
          headers: {
            'Access-Control-Allow-Origin':'',
            'Content-Type': 'application/json'
          }
        })*/
      .then(response => response.json())
      .then(order => {
        debugger 
        dispatch(checkedOut())
      })
    }
  }