let header = new Headers({
  'Access-Control-Allow-Origin':'',
  'Content-Type': 'multipart/form-data'
});

let sentData={
    method: 'GET',
    mode: 'cors',
    header: header
};

// ** action creators **
const setFarmers = farmers => {
  //debugger 
  farmers = farmers.data 
  return {
    type: 'GET_FARMER_SUCCESS',
    farmers
  }
}

/*
const addCart = cart => {
  return {
    type: 'CREATE_CART_SUCCESS',
    cart
  }
}
*/

// ** async actions **

//debugger

export const getFarmers = () => {
  //debugger
  return dispatch => {
    return fetch('http://localhost:3000/api/farmers', header)
      //fetch(`${API_URL}/carts`)
      .then(response => response.json())
      .then(farmers => dispatch(setFarmers(farmers)))
      .catch(error => console.log(error));
  }
}

export const getFarmer = (farmer_id) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/farmers/${farmer_id}`, header)
    .then(response => response.json())
    .then(farmer => dispatch(setFarmer(farmer)))
    .catch(error => console.log(error));
  }
}

const setFarmer = farmer => {
  return {
    type: 'GET_A_FARMER_SUCCESS',
    farmer
  }
}


/*
export const createCart = cart => {
  return dispatch => {
    return fetch('http://localhost:3000/api/carts', {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ cart: cart })
    })
    .then(response => response.json())
    .then(cart => {
      dispatch(addCart(cart))
      dispatch(resetCartForm())
    })
    .catch(error => console.log(error))
  }
}
*/
