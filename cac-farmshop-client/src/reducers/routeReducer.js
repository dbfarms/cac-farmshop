const initialState = { routeName: '/' };

export default (state = initialState, action) => {
  switch(action.type) {
    case 'CHANGING_ROUTE':
      return action.routeName; //Object.assign({}, state, { routeName: action.routeName })

    default:
      return state
  }
}
