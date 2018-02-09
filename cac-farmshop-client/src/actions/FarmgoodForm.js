// ** action creators **

export const updateFarmgoodFormData = FarmgoodFormData => {
    return {
      type: 'UPDATED_FARMGOOD_DATA',
      FarmgoodFormData
    }
  }
  
  export const resetFarmGoodForm = () => {
    return {
      type: 'RESET_FARMGOOD_FORM'
    }
  }
  