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
        const editState = [...state.map(li => {
          if (li.id === action.lineitem.data.id) {
            return action.lineitem.data 
          } else {
            return li 
          }
        })]
        return (editState)
      case 'GET_LINEITEM_SUCCESS':
      //debugger 
      //const lineItemState = [...state, action.lineitems, action.userLineItems]
      //const lineitems = action.lineitems
      //const userLineItems = action.userLineItems
          //const openState = Object.assign({}, ...action.openLineitems)
          //debugger 
        return (action.openLineitems)//)
      case 'GET_ALL_LINEITEMS_SUCCESS':
        //debugger 
          const closedState = Object.assign({}, ...action.closedLineitems)
          debugger 
        return (action.closedLineitems)  
      case 'DELETE_LINEITEM_SUCCESS':
        //debugger 
        var newState = Object.assign([], state);
        const indexOfLineItemToDelete = state.findIndex(li => {
          return Number(li.id) === action.lineItemId
        })
        const lineItem = state[indexOfLineItemToDelete]
        debugger
        if (lineItem.attributes.quantity > 1 ) {
          newState[indexOfLineItemToDelete].attributes.quantity -= 1 
        } else {
          if (indexOfLineItemToDelete > -1 ) {
            newState.splice(indexOfLineItemToDelete, 1)
          }
        }
        //debugger
        return (
          newState
        );
      //case 'GET_ALL_USER_LINEITEMS':
        //debugger 
        //return action.userLineItems 
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