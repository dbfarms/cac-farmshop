import * as types from './actionTypes';  
import sessionApi from '../api/sessionApi';
import auth from '../auth/authenticator';

export function loginSuccess() {  
  return {type: types.LOG_IN_SUCCESS}
}

export function logInUser(credentials) {  
  return function(dispatch) {
    return sessionApi.login(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      dispatch(loginSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}

export function signUpSuccess() {
  return {type: types.SIGN_UP_SUCCESS}
}

export function signUpUser(credentials) {
  return function(dispatch) {
    return sessionApi.signup(credentials).then(response => {
      sessionStorage.setItem('jwt', response.jwt);
      dispatch(signUpSuccess());
    }).catch(error => {
      throw(error);
    });
  };
}


export function logOutUser() {  
    auth.logOut();
    return {type: types.LOG_OUT}
  }