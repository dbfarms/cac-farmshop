const initialState = {
    user_id: 0,
    status: ''
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'UPDATED_DATA':
      return action.farmGoodFormData

    case 'RESET_FARMGOOD_FORM':
      return initialState;

    default:
      return state;
  }
}
