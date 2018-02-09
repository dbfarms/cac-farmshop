// ** action creators **

export const updateFarmgoodFormData = FarmgoodFormData => {
    return {
      type: 'UPDATED_DATA',
      FarmgoodFormData
    }
  }
  
  export const resetFarmgoodForm = () => {
    return {
      type: 'RESET_FARMGOOD_FORM'
    }
  }
  