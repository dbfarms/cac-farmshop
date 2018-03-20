export default (state = [], action) => {
    switch(action.type) {
      case 'ADD_TO_CART_SUCCESS':
        //debugger 
        //const newCart = []
        const addedItem = Object.assign([], state)
        //debugger
        return (
          addedItem.concat(action.lineitem.data)
        )
      case 'ADD_QUANTITY_CART_SUCCESS':
        //debugger 
        const editedLineItem = Object.assign({}, action.lineitem.data)
        const editState = [...state.filter(li => li.id !== action.lineitem.data.id)]
        editState.push(editedLineItem)
        return (editState)
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