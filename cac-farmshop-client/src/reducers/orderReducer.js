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
        
        var openFos = state[0]
        var closedFos = state[1]

        var indexOfFarmerOrder = -1

        
        openFos.findIndex((fo, index) => {
          if (fo.id == action.farmerOrder.id) {
            indexOfFarmerOrder = index 
            closedFos.push(action.farmerOrder)
            openFos.splice(indexOfFarmerOrder, 1)
            return true 
          }
        })

        if (indexOfFarmerOrder === -1 ) {
          //debugger 
          closedFos.findIndex((fo, index) => {
            //debugger 
            if (fo.id == action.farmerOrder.id) {
              indexOfFarmerOrder = index 
              openFos.push(action.farmerOrder)
              closedFos.splice(indexOfFarmerOrder, 1)
              return true 
            }
          })
        }

        //debugger 
        const orders = []
        orders.push(openFos)
        orders.push(closedFos) 
        //debugger 
        return (
          orders 
        );
      case 'CHECKOUT_SUCCESS':
        //debugger 
        return action.order 
      default:
        return state
    }
  }
  