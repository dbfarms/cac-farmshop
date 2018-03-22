const checkedOut = (order) =>{
    //debugger
    //lineitems = [] 
    return {
      type: 'CHECKOUT_SUCCESS',
      order
    }
  }
  
  export const checkingOutNow = (lineitems, cartID) => {
    //debugger
    return dispatch => {
      return fetch('http://localhost:3000/api/orders', {
          headers: {
            'Access-Control-Allow-Origin':'',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({ cart_id: cart_id, farmgood_id: farmgood_id })
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