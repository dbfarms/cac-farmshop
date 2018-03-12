import * as types from '../actions/actionTypes';  
import initialState from './initialState';  
//import {browserHistory} from 'react-router-dom';

export default function sessionReducer(state = initialState.session, action) {  
  //debugger 
  switch(action.type) {
    case types.SIGN_UP_SUCCESS:
      //browserHistory.push('/')
      return !!sessionStorage.jwt 
    case types.NEW_USER_SUCCESS:
      return //
    case types.LOG_IN_SUCCESS:
      //browserHistory.push('/farm-goods')
      //debugger
      return !!sessionStorage.jwt
    case types.LOG_OUT:
      //browserHistory.push('/')
      return (
        !!sessionStorage.jwt,
        !!sessionStorage.role
      )
    case types.USER_SUCCESS:
      return sessionStorage 
    case types.GET_USERS_SUCCESS:
      //debugger 
      return action.users.data
    default: 
      return state;
  }
}
/*


*/