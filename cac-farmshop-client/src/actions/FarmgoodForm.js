// ** action creators **

export const updateFarmgoodFormData = FarmgoodFormData => {
    return {
      type: 'UPDATED_FARMGOOD_DATA',
      FarmgoodFormData
    }
  }

  export const updateEditedFarmgoodFormData = FarmgoodFormData => {
    //console.log(FarmgoodFormData)
    //debugger
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

  export const editFarmgoodFormData = FarmgoodFormData => {
    return {
      type: 'EDIT_FARMGOOD_DATA', 
      FarmgoodFormData
    }
  }
  