export default (state = [], action) => {
    switch(action.type) {
      case 'GET_DAYS_SUCCESS':
        return action.days
      default:
        return state
    }
  }
  