import * as types from './actionTypes';  
import sessionApi from '../api/sessionApi';
import auth from '../auth/authenticator';


const loginSuccess = () => {
  //debugger 
  return {
    type: 'LOG_IN_SUCCESS'
  }
}


export function logInUser(credentials, history) {  
  //debugger
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      sessionStorage.setItem('role', response.role);
      sessionStorage.setItem('id', response.farmer_id);
      dispatch(loginSuccess());
      history.push('/farm-goods')
    }).catch(error => {
      throw(error);
    });
  };
}

export function signUpSuccess() {
  return {type: types.SIGN_UP_SUCCESS}
}

export function signUpUser(credentials, history) {
  return function(dispatch) {
    return sessionApi.signup(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      dispatch(signUpSuccess());
      history.push('/farm-goods')
    }).catch(error => {
      throw(error);
    });
  };
}

export function newUserSuccess() {
  return {type: types.NEW_USER_SUCCESS}
}

export function adminSignUpUser(credentials, history) {
  return function(dispatch) {
    return sessionApi.adminSignup(credentials).then(response => {
      dispatch(newUserSuccess());
      history.push('/users')
    }).catch(error => {
      throw(error);
    });
  };
}

export function adminCustomerSignUpUser(credentials, history) {
  return function(dispatch) {
    return sessionApi.adminCustomerSignup(credentials).then(response => {
      dispatch(newUserSuccess());
      history.push('/users')
    }).catch(error => {
      throw(error);
    });
  };
}

export function logOutUser() {  
    auth.logOut();
    return {type: types.LOG_OUT}
}

let header = new Headers({
  'Access-Control-Allow-Origin':'',
  'Content-Type': 'multipart/form-data',
  'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
});

const setUsers = users => {
  return {
    type: 'GET_USERS_SUCCESS',
    users
  }
}

export function getUsers() {
  //debugger
  return function(dispatch) {
    return sessionApi.usersGet().then(response => {
      dispatch(setUsers(response));
      //history.push('/users')
    }).catch(error => {
      throw(error);
    });
  };
}

const setCustomerUsers = customers => {
  //debugger
  return {
    type: 'GET_CUSTOMERS_SUCCESS',
    customers
  }
}

export function getCustomerUsers() {
  //debugger
  return function(dispatch) {
    return sessionApi.usersCustomersGet().then(response => {
      dispatch(setCustomerUsers(response));
      //history.push('/users')
    }).catch(error => {
      throw(error);
    });
  };
}

////



const setCombinedUsers = users => {
  debugger
  return {
    type: 'GET_CUSTOMERS_SUCCESS',
    users
  }
}

export function getCombinedUsers() {
  //debugger
  return function(dispatch) {
    return sessionApi.farmersGet().then(response => {
      dispatch(setUsers(response));
      //history.push('/users')
    }), 
    
    sessionApi.usersCustomersGet().then(response => {
      dispatch(setCustomerUsers(response));
    }).catch(error => {
      throw(error);
    })
  };
}




/*
export const getUsers = () => {
  return dispatch => {
    //debugger
    return fetch('http://localhost:3000/users', { // current-user
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
      },
    })
    .then(response => response.json())
    .then(userAuth => dispatch(setUser(userAuth)))
    .catch(error => console.log(error))
  }
}


//LEFT OFF: 'CAN'T ADD NEW KEY INTO HAS DURING ITERATION' IN APPLICATION CONTROLLER 24
/*
export const getUser = () => {
  return dispatch => {
    //debugger
    return fetch('http://localhost:3000/session', { // current-user
      headers: {
        'Access-Control-Allow-Origin':'',
        'Content-Type': 'application/json',
        'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
      },
      //method: "POST",
      //body: JSON.stringify(sessionStorage.jwt)
    })
    .then(response => response.json())
    .then(userAuth => dispatch(setUser(userAuth)))
    .catch(error => console.log(error))
  }
}
*/

const setUser = user => {
  //debugger 
  return {
    type: 'USER_SUCCESS',
    user
  }
}


/*
export const getFarmGoods = () => {
  return dispatch => {
   // debugger
    return fetch('http://localhost:3000/api/farmgoods', header)
   // fetch('http://localhost:3000/api/days', header) ///
      .then(response => response.json())
      .then(farmGoods => dispatch(setFarmGoods(farmGoods)))
      .catch(error => console.log(error));
  }
}

*/