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

const deletingFarmgood = farmGood => {
  debugger 
  return {
    type: 'DELETE_FARMGOOD_SUCCESS',
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

function deleteRequest(farmGood) {
  const request = new Request(`http://localhost:3000/api/farmgoods/${farmGood.id}`, {
    headers: {
      'Access-Control-Allow-Origin':'',
      'Content-Type': 'application/json'
    },
    method: 'DELETE'
  });

  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });

}

export function deleteFarmGoods(farmGood) {  
  return function(dispatch) {
    return deleteRequest(farmGood).then(() => {
      console.log(`Deleted ${farmGood.id}`)
      dispatch(deletingFarmgood(farmGood));
      return;
    }).catch(error => {
      throw(error);
    })
  }
}

/*
export const deleteFarmGoods = farmGood => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/farmgoods/${farmGood.id}`, {
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json'
      },
      method: "DELETE",
      //body: JSON.stringify({ farmGood: farmGood })
    }) 
    .then(farmGood => {
      dispatch(deletingFarmgood(farmGood))
    })
   }
}
////////////////
  
export function deleteCat(cat) {  
  return function(dispatch) {
    return catApi.deleteCat(cat).then(() => {
      console.log(`Deleted ${cat.id}`)
      dispatch(deleteCatSuccess(cat));
      return;
    }).catch(error => {
      throw(error);
    })
  }

...
   static deleteCat(cat) {
    const request = new Request(`http://localhost:5000/api/v1/cats/${cat.id}`, {
      method: 'DELETE'
    });

    return fetch(request).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
  }
}

//////
export const deleteFarmGoods = farmGood => {
  const request = new Request(`http://localhost:3000/api/farmgoods/${farmGood.id}`, {
    method: 'DELETE'
  });


  return fetch(request).then(response => {
    return response.json();
  }).catch(error => {
    return error;
  });

}

*/