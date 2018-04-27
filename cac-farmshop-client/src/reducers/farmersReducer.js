export default (state = [], action) => {
  switch(action.type) {
    case 'GET_FARMER_SUCCESS':
      return action.farmers
    case 'GET_A_FARMER_SUCCESS':
    //debugger 
      return action.farmer
    //case 'CREATE_FARMER_SUCCESS':
    //  return state.concat(action.farmer);
    default:
      return state
  }
}
