import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk';

import farmGoods from './reducers/farmGoodsReducer'
import farmGood from './reducers/farmGoodsReducer'
import farmers from './reducers/farmersReducer'
import carts from './reducers/carts';
import cart from './reducers/carts';
import openLineitems from './reducers/lineitemsReducer';
//import closedLineitems from './reducers/lineitemsReducer';
import cartFormData from './reducers/cartFormData';
import FarmgoodFormData from './reducers/farmGoodFormData';
import EditedFarmgoodFormData from './reducers/farmGoodFormData';
import days from './reducers/daysReducer';
import session from './reducers/sessionReducer';
import users from './reducers/sessionReducer';
import customers from './reducers/sessionReducer';
import orders from './reducers/orderReducer';
//import order from './reducers/orderReducer';
//import farmerLineItems from './reducers/lineitemsReducer';
//import farmerOrder from './reducers/orderReducer';

const appReducer = combineReducers({
  carts,
  cart,
  cartFormData,
  farmers,
  farmGood,
  farmGoods,
  FarmgoodFormData,
  farmGood, //: single_farmgood,
  EditedFarmgoodFormData,
  days,
  session,
  users,
  customers,
  openLineitems,
  //closedLineitems,
  orders,
  //order,
  //farmerLineItems,
  //farmerOrder,
});

const rootReducer = (state, action) => {
  //debugger 
  if (action.type === 'LOG_OUT') {
    state = undefined
  }

  return appReducer(state, action)
}

const middleware = [thunk]; //for async actions

export default createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);

/*
import {
  createStore,
  applyMiddleware,
  combineReducers
} from 'redux'
import thunk from 'redux-thunk';

import farmGood from './reducers/farmGoodsReducer'
import farmGoods from './reducers/farmGoodsReducer'
import farmers from './reducers/farmersReducer'
import carts from './reducers/carts';
import cart from './reducers/carts';
import openLineitems from './reducers/lineitemsReducer';
import closedLineitems from './reducers/lineitemsReducer';
import cartFormData from './reducers/cartFormData';
import FarmgoodFormData from './reducers/farmGoodFormData';
import EditedFarmgoodFormData from './reducers/farmGoodFormData';
import days from './reducers/daysReducer';
import session from './reducers/sessionReducer';
import users from './reducers/sessionReducer';
import customers from './reducers/sessionReducer';
import orders from './reducers/orderReducer';
//import order from './reducers/orderReducer';
import farmerLineItems from './reducers/lineitemsReducer';
//import farmerOrder from './reducers/orderReducer';

const reducers = combineReducers({
  carts,
  cart,
  cartFormData,
  farmers,
  farmGoods,
  FarmgoodFormData,
  farmGood,
  EditedFarmgoodFormData,
  days,
  session,
  users,
  customers,
  openLineitems,
  closedLineitems,
  orders,
  //order,
  farmerLineItems,
  //farmerOrder,
});

const middleware = [thunk]; //for async actions

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);

*/