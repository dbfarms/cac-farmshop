export default (state = [], action) => {
    switch(action.type) {
      case 'ADD_TO_CART_SUCCESS':
        //debugger 
        //const newCart = []
        return action.lineitem.data
      case 'GET_LINEITEM_SUCCESS':
        //debugger 
        return action.lineitems
      case 'DELETE_LINEITEM_SUCCESS':
        //debugger 
        const newState = Object.assign([], state);
        const indexOfLineItemToDelete = state.findIndex(li => {
          //debugger 
          return Number(li.id) === action.lineItemId
        })
        if (indexOfLineItemToDelete > -1 ) {
          newState.splice(indexOfLineItemToDelete, 1)
        }
        //debugger 
        return (
          newState
        );
      default:
        return state
    }
  }

 /*
case 'DELETE_FARMGOOD_SUCCESS':
        const newState = Object.assign([], state);
        const indexOfFarmgoodToDelete = state.data.findIndex(farmGood => {
        return farmGood.id == action.farmGood.id
        })
        if (indexOfFarmgoodToDelete > -1) {
        newState.data.splice(indexOfFarmgoodToDelete, 1)
        }
        //debugger 
        return (
          newState
        );

 */