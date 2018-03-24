export default (state = [], action) => {
  //debugger 
    switch(action.type) {
      case 'GET_ORDERS_SUCCESS':
        return action.orders
      case 'GET_ORDER_SUCCESS':
      //debugger
        return action.order //this is not right probably
      case 'CREATE_ORDER_SUCCESS':
        return state.concat(action.order);
      case 'GET_FARMERORDERS_SUCCESS':
        //debugger 
        return action.openFarmerOrders
      default:
        return state
    }
  }
  