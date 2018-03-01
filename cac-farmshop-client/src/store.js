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
import cartFormData from './reducers/cartFormData';
import FarmgoodFormData from './reducers/farmGoodFormData';
import EditedFarmgoodFormData from './reducers/farmGoodFormData';
import days from './reducers/daysReducer';
import session from './reducers/sessionReducer';


const reducers = combineReducers({
  carts,
  cartFormData,
  farmers,
  farmGoods,
  FarmgoodFormData,
  farmGood,
  EditedFarmgoodFormData,
  days,
  session
});

const middleware = [thunk]; //for async actions

export default createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware),
);
