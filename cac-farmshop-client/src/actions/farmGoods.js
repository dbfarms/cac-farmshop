import { resetFarmGoodForm } from './FarmgoodForm';
//const API_URL = process.env.REACT_APP_API_URL;

  //#####################
  //EVENTUALLY THIS WILL HAVE TO BE INCLUDED IN ORDER TO ENSURE THE AUTHORIZATION WORKS 
  
  //static requestHeaders() {
  //  return {'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`}
  //}
  //##########################

let header = new Headers({
  'Access-Control-Allow-Origin':'',
  'Content-Type': 'multipart/form-data',
  'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
});

//header.append('AUTH_TEST', `Bearer ${sessionStorage.jwt}`)

let sentData={
    method: 'GET',
    mode: 'cors',
    header: header
};

// ** action creators **


const setFarmGoods = farmGoods => {
  return {
    type: 'GET_FARMGOOD_SUCCESS',
    farmGoods
  }
}

const setFarmGood = farmGood => {
  return {
    type: 'GET_A_FARMGOOD_SUCCESS',
    farmGood
  }
}

const addFarmGoods = farmGood => {
  //debugger 
  return {
    type: 'CREATE_FARMGOOD_SUCCESS',
    farmGood
  }
}


const updateFarmgood = farmGood => {
  return {
    type: 'UPDATE_FARMGOOD_SUCCESS', 
    farmGood
  }
}

const deletingFarmgood = farmGood => {
  return {
    type: 'DELETE_FARMGOOD_SUCCESS',
    farmGood
  }
}

// ** async actions **

export const getFarmGood = (id) => {
  return dispatch => {
   // debugger
    return fetch(`http://localhost:3000/api/farmgoods/${id}`, header)
   // fetch('http://localhost:3000/api/days', header) ///
      .then(response => response.json())
      .then(farmGood => dispatch(setFarmGood(farmGood)))
      .catch(error => console.log(error));
  }
}

export const getFarmGoods = () => {
  return dispatch => {
    return fetch('http://localhost:3000/api/farmgoods', header)
      .then(response => response.json())
      .then(farmGoods => dispatch(setFarmGoods(farmGoods)))
      .catch(error => console.log(error));
  }
}

//
export const getCustomerFarmGoods = () => {
  return dispatch => {
    return fetch('http://localhost:3000/api/farmgoods', header)
      .then(response => response.json())
      .then(farmGoods => dispatch(setFarmGoods(farmGoods)))
      //.then(dispatch(getCart(sessionStorage.id)))
      .catch(error => console.log(error));
  }
}

export const getCart = (user_id) => {
  debugger
  return dispatch => {
    return fetch('http://localhost:3000/api/carts', header)
      //fetch(`${API_URL}/carts`)
      .then(response => response.json())
      .then(carts => dispatch(setCart(carts, user_id)))
      .catch(error => console.log(error));
  }
}

const setCart = (carts, user_id) => {
  //debugger
  const cart = carts.data.filter(cart => cart.attributes["customer-user-id"] === Number(user_id))
  //debugger 
  return {
    type: 'GET_CART_SUCCESS',
    cart
  }
}

//

export const createFarmgood = (farmGood, history) => {
  return dispatch => {
    return fetch('http://localhost:3000/api/farmgoods', {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ farmGood: farmGood })
    })
    .then(response => {
      return response.json()
    })
    .then(farmGood => {
      dispatch(resetFarmGoodForm())
      dispatch(addFarmGoods(farmGood));
      //debugger 
      //history.push('/farm-goods')
    })
    .catch(error => console.log(error))
  }
}

export const callToEditFarmgood = (farmGood, history) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/farmgoods/${farmGood.id}`, {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({ farmGood: farmGood })
    })
    .then(response => {
      return response.json()
    })
    .then(farmGood => {
      dispatch(resetFarmGoodForm())
      dispatch(updateFarmgood(farmGood))
      history.push('/farm-goods')
    })
    .catch(error => console.log(error))
  }
}

export const deleteFarmGoods = (farmGood, history) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/farmgoods/${farmGood.id}`, {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      //credentials: "same-origin"
    })
    .then((response) => {
      if (!response.ok) {
        console.error(response.statusText)
      } else {
        console.log('????')
      }
      //return response.json();
    }).then(() => {
      console.log(`Deleted ${farmGood.id}`)
      dispatch(resetFarmGoodForm())
      dispatch(deletingFarmgood(farmGood));
      history.push('/farm-goods')
      //return
    }).catch(error => {
      return error;
    });
    }
  }
  

/*

*/