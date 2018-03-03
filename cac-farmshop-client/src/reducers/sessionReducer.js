import * as types from '../actions/actionTypes';  
import initialState from './initialState';  
//import {browserHistory} from 'react-router-dom';

export default function sessionReducer(state = initialState.session, action) {  
  //debugger 
  switch(action.type) {
    case types.SIGN_UP_SUCCESS:
      //browserHistory.push('/')
      return !!sessionStorage.jwt 
    case types.LOG_IN_SUCCESS:
      //browserHistory.push('/farm-goods')
      //debugger
      return !!sessionStorage.jwt
    case types.LOG_OUT:
      //browserHistory.push('/')
      return !!sessionStorage.jwt
    case types.USER_SUCCESS:
      return sessionStorage 
    default: 
      return state;
  }
}
/*


*/