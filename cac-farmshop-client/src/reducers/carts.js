export default (state = [], action) => {
  switch(action.type) {
    case 'GET_CART_SUCCESS':
      return action.carts
    case 'CREATE_CART_SUCCESS':
      return state.concat(action.cart);
    default:
      return state
  }
}
