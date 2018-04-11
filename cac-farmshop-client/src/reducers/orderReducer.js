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
        return action.allFarmerOrders
      case 'CHANGE_ORDER_STATUS_SUCCESS':
        const newState = Object.assign([], state);
        const indexOfFarmerOrder = state.findIndex(fo => {
          return fo.id == action.farmerOrder.id
        })
        newState.splice(indexOfFarmerOrder, 1, action.farmerOrder)
        //debugger 
        const orders = newState
        //debugger 
        return (
          orders 
        );

      default:
        return state
    }
  }
  