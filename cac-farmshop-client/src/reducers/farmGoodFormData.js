const initialState = {
    name: '',
    farmer: '',
    isEditing: false,
}

export default (state = initialState, action) => {

  switch(action.type) {
    case 'UPDATED_FARMGOOD_DATA':
      console.log(action)
      return action.FarmgoodFormData

    case 'RESET_FARMGOOD_FORM':
      return initialState;

    case 'EDIT_FARMGOOD_DATA':
      return action.EditedFarmgoodFormData

    default:
      return state;
  }
}
