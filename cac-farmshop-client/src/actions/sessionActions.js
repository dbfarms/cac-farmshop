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
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      sessionStorage.setItem('role', response.role);
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


export function logOutUser() {  
    auth.logOut();
    return {type: types.LOG_OUT}
}

let header = new Headers({
  'Access-Control-Allow-Origin':'',
  'Content-Type': 'multipart/form-data',
  'AUTHORIZATION': `Bearer ${sessionStorage.jwt}`
});


//LEFT OFF: 'CAN'T ADD NEW KEY INTO HAS DURING ITERATION' IN APPLICATION CONTROLLER 24
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
    .then(response=> {
      debugger 
      response.json()})
    .then(userAuth => dispatch(setUser(userAuth)))
    .catch(error => console.log(error))
  }
}

const setUser = user => {
  debugger 
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