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
    type: 'GET_CART_SUCCESS',
    carts
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
