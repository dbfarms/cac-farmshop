const initialState = {
    name: ''
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'UPDATED_FARMGOOD_DATA':
      return action.FarmgoodFormData

    case 'RESET_FARMGOOD_FORM':
      return initialState;

    default:
      return state;
  }
}
