import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk';

const carts = (state = [], action) => {
  switch(action.type) {
    case 'GET_CART_SUCCESS':
      return action.carts

    default:
      return state
  }
}

const reducers = combineReducers({
  carts: carts
});

const middleware = [thunk];

export default createStore(
  reducers,
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
