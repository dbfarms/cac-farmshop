export default (state = [], action) => {
    switch(action.type) {
      case 'ADD_TO_CART_SUCCESS':
        //debugger 
        //const newCart = []
        return action.lineitem.data
      case 'GET_LINEITEM_SUCCESS':
        //debugger 
        return action.lineitems
      default:
        return state
    }
  }

 