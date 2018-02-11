export default (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_FARMGOOD_SUCCESS':
      return [
        ...state.filter(farmgood => farmgood.id !== action.farmGood.id),
        Object.assign({}, action.farmGood)
      ]
    case 'GET_FARMGOOD_SUCCESS':
      return action.farmGoods
    case 'CREATE_FARMGOOD_SUCCESS':
      return state.concat(action.farmGood);
    default:
      return state
  }
}


