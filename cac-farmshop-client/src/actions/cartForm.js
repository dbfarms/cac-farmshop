// ** action creators **

export const updateCartFormData = cartFormData => {
  return {
    type: 'UPDATED_DATA',
    cartFormData
  }
}

export const resetCartForm = () => {
  return {
    type: 'RESET_CART_FORM'
  }
}
