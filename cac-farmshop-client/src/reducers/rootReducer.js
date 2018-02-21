import {combineReducers} from 'redux';  
//import cats from './catReducer';  
//import hobbies from './hobbyReducer';  
import session from './sessionReducer';

const rootReducer = combineReducers({  
  //cats,
  //hobbies,
  session
})

export default rootReducer;