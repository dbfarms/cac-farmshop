export default (state = [], action) => {
  switch(action.type) {
    case 'GET_CARTS_SUCCESS':
      return action.carts
    case 'GET_CART_SUCCESS':
    //debugger
      return action.cart[0]
    case 'CREATE_CART_SUCCESS':
      return state.concat(action.cart);
    default:
      return state
  }
}
