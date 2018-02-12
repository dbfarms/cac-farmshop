import { resetFarmGoodForm } from './FarmgoodForm';
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
const setFarmGoods = farmGoods => {
  return {
    type: 'GET_FARMGOOD_SUCCESS',
    farmGoods
  }
}


const addFarmGoods = farmGood => {
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

// ** async actions **
export const getFarmGoods = () => {
  return dispatch => {
    return fetch('http://localhost:3000/api/farmgoods', header)
      .then(response => response.json())
      .then(farmGoods => dispatch(setFarmGoods(farmGoods)))
      .catch(error => console.log(error));
  }
}


export const createFarmgood = farmGood => {
  return dispatch => {
    return fetch('http://localhost:3000/api/farmgoods', {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({ farmGood: farmGood })
    })
    .then(response => response.json())
    .then(farmGood => {
      dispatch(addFarmGoods(farmGood))
      dispatch(resetFarmGoodForm())
    })
    .catch(error => console.log(error))
  }
}

export const callToEditFarmgood = farmGood => {
  return dispatch => {
    return fetch('http://localhost:3000/api/farmgoods', {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: "PUT",
      body: JSON.stringify({ farmGood: farmGood })
    })
    .then(response => response.json())
    .then(farmGood => {
      dispatch(updateFarmgood(farmGood))
      dispatch(resetFarmGoodForm())
    })
    .catch(error => console.log(error))
  }
}