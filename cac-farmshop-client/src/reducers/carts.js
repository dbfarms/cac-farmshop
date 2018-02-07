export default (state = [], action) => {
  switch(action.type) {
    case 'GET_CART_SUCCESS':
      return action.carts

    default:
      return state
  }
}
