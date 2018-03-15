import { resetCartForm } from './cartForm'

//const API_URL = process.env.REACT_APP_API_URL;

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
const setCarts = carts => {
  return {
    type: 'GET_CARTS_SUCCESS',
    carts
  }
}

const addCart = cart => {
  return {
    type: 'CREATE_CART_SUCCESS',
    cart
  }
}

// ** async actions **
export const getCarts = () => {
  return dispatch => {
    return fetch('http://localhost:3000/api/carts', header)
      //fetch(`${API_URL}/carts`)
      .then(response => response.json())
      .then(carts => dispatch(setCarts(carts)))
      .catch(error => console.log(error));
  }
}

const setCart = (carts, user_id) => {
  //debugger
  const cart = carts.map(cart => cart.customer_user_id === Number(user_id))
  return {
    type: 'GET_CART_SUCCESS',
    cart
  }
}

export const getCart = (user_id) => {
  return dispatch => {
    return fetch('http://localhost:3000/api/carts', header)
      //fetch(`${API_URL}/carts`)
      .then(response => response.json())
      .then(carts => dispatch(setCart(carts, user_id)))
      .catch(error => console.log(error));
  }
}

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
