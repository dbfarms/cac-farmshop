export default (state = {
  user_id: 0,  
  status: ''
}, action) => {

  switch(action.type) {
    case 'UPDATED_DATA':
      return action.cartFormData

    default:
      return state;
  }
}
