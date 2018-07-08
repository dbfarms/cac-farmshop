export default (state = [], action) => {
    switch(action.type) {
      case 'GET_CAT_SUCCESS':
        return action.categories.data
      default:
        return state
    }
  }
  