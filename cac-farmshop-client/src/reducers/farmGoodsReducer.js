export default (state = [], action) => {
  switch(action.type) {
    case 'GET_FARMGOOD_SUCCESS':
      return action.farmGoods
    case 'CREATE_FARMGOOD_SUCCESS':
      return state.concat(action.farmGood);
    default:
      return state
  }
}


