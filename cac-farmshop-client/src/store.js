import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk';

import farmers from './reducers/farmersReducer'
import carts from './reducers/carts';
import cartFormData from './reducers/cartFormData';
//import route from './reducers/routeReducer';

const reducers = combineReducers({
  carts,
  cartFormData,
  farmers,
  //route
});

const middleware = [thunk]; //for async actions

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);
