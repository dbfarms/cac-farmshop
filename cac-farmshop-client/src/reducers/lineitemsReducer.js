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
         // console.log(action.openLineitems)
        return (action.openLineitems)//)
      case 'GET_ALL_LINEITEMS_SUCCESS':
        //debugger 
        //debugger 
        return (action.closedLineitems)  
      case 'DELETE_LINEITEM_SUCCESS':
        //debugger 
        var newState = Object.assign([], state);
        //if (action.initialQuantity === state[0].attributes.quantity )
        //{
          //debugger 
          const indexOfLineItemToDelete = state.findIndex(li => {
            return Number(li.id) === action.lineItemId
          })
          const lineItem = state[indexOfLineItemToDelete]
          //debugger
          if (lineItem.attributes.quantity > 1 ) {
            //debugger 
            newState[indexOfLineItemToDelete].attributes.quantity -= 1 
          } else {
            //debugger 
            if (indexOfLineItemToDelete > -1 ) {
              //debugger 
              newState.splice(indexOfLineItemToDelete, 1)
            }
          }
        //}
        /*
        if (action.initialQuantity === state[0].attributes.quantity )
        {
          debugger 
          const indexOfLineItemToDelete = state.findIndex(li => {
            return Number(li.id) === action.lineItemId
          })
          const lineItem = state[indexOfLineItemToDelete]
          //debugger
          if (lineItem.attributes.quantity > 1 ) {
            debugger 
            newState[indexOfLineItemToDelete].attributes.quantity -= 1 
          } else {
            debugger 
            if (indexOfLineItemToDelete > -1 ) {
              debugger 
              newState.splice(indexOfLineItemToDelete, 1)
            }
          }
        }
        */
        //debugger 
        return (
          newState
        );
      case 'ADD_LINEITEM_SUCCESS':
        var newStateAdd = Object.assign([], state);
        if (action.initialQuantity === state[0].attributes.quantity) {
          const indexOfLineItemToAdd = state.findIndex(li => {
            return Number(li.id) === action.lineItemId
          })
          const lineItemtoAddto = state[indexOfLineItemToAdd]
          newStateAdd[indexOfLineItemToAdd].attributes.quantity += 1
        }

        return newStateAdd;
      case 'GET_ALL_USER_LINEITEMS':
        //debugger 
        return action.allLineItems 
      case 'GET_FARMERLINEITEMS_SUCCESS':
        //debugger 
        return action.farmerLineItems
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