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
import order from './reducers/orderReducer';
import farmerLineItems from './reducers/lineitemsReducer';

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
  order,
  farmerLineItems  
});

const middleware = [thunk]; //for async actions

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);
