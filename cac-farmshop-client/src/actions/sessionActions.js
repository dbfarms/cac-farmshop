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