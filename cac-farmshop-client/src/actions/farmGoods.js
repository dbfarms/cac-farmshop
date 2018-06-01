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

  function compare(a,b) {
    //debugger 
    if (a.attributes.category.id < b.attributes.category.id)
      return -1;
    if (a.attributes.category.id > b.attributes.category.id)
      return 1;
    return 0;
  }

  function subCatcompare(a,b) {
    //debugger 
    if (a.attributes["sub-category"].id < b.attributes["sub-category"].id)
      return -1;
    if (a.attributes["sub-category"].id > b.attributes["sub-category"].id)
      return 1;
    return 0;
  }

  const sortedFarmgoods = farmGoods.data.sort(compare)
  const subcatSorted = sortedFarmgoods.sort(subCatcompare)
  //debugger 

  return {
    type: 'GET_FARMGOOD_SUCCESS',
    farmGoods
  }
}

const setFarmGood = farmGood => {
  //debugger
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

export const getSingleFarmGood = (farmer_id, farmgood_id) => {
  //debugger
  return dispatch => {
   // debugger
    return fetch(`http://localhost:3000/api/farmers/${farmer_id}/farmgoods/${farmgood_id}`, header)
      .then(response => response.json())
      .then(farmGood => dispatch(setFarmGood(farmGood)))
      .catch(error => console.log(error));
  }
}

export const getFarmGoods = () => {
  //debugger
  return dispatch => {
    return fetch('http://localhost:3000/api/farmgoods', header)
      .then(response => response.json())
      .then(farmGoods => dispatch(setFarmGoods(farmGoods)))
      .catch(error => console.log(error));
  }
}

export const getAll = () => {
  //debugger
  //const user_id = Number(sessionStorage.id)

  if (sessionStorage.id != undefined) {
   //debugger 
    return dispatch => {
      return fetch('http://localhost:3000/api/farmgoods', header)
        .then(response => response.json())
        .then(farmGoods => dispatch(setFarmGoods(farmGoods))),
        fetch('http://localhost:3000/api/line_items', {
          headers: {
            'Access-Control-Allow-Origin':'',
            'Content-Type': 'application/json',
          },
        })
        .then(response => response.json())
        .then(lineitems => { 
          //debugger 
         dispatch(getCart(sessionStorage.id))
        .then(response => {debugger} )//dispatch(showOpenLineItems(lineitems, response.current_cart)))//,
        })
        .catch(error => console.log(error))
    }
  } else {
    getFarmGoods();
  }
}

const showOpenLineItems = (lineitems, cart) => {

  const openLineitems = lineitems.data.filter(li =>
    li.attributes["cart-id"] === Number(cart.id)
  )
  //debugger 
  return {
    type: 'GET_LINEITEM_SUCCESS',
    openLineitems
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
  //debugger
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
  //var cart = []
  //if (user_id != "undefined"){
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

  export const getAllFarmerGoods = (farmer_id) => {
    return dispatch => {
      return fetch(`http://localhost:3000/api/farmers/${farmer_id}/farmgoods`, header)
        .then(response => response.json())
        .then(farmgoods => dispatch(setAllFarmerGoods(farmgoods)))
        .catch(error => console.log(error));
    }
  }
  
  const setAllFarmerGoods = (farmgoods) => {
    return {
      type: 'GET_ALL_FARMERGOODS_SUCCESS',
      farmgoods
    }
  }

/*

*/