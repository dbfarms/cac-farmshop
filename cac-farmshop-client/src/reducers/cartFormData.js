const initialState = {
    user_id: 0,
    status: ''
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'UPDATED_DATA':
      return action.cartFormData

    case 'RESET_CART_FORM':
      return initialState;

    default:
      return state;
  }
}
