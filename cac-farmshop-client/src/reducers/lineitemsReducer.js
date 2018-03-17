export default (state = [], action) => {
    switch(action.type) {
      case 'ADD_TO_CART_SUCCESS':
        debugger 
        return action.lineitems 
      default:
        return state
    }
  }
  