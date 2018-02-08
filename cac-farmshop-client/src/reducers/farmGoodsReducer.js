export default (state = [], action) => {
  switch(action.type) {
    case 'GET_FARMGOOD_SUCCESS':
      return action.farmGoods
    default:
      return state
  }
}
