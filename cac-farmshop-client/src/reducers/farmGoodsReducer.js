import { Route } from 'react-router-dom'

export default (state = [], action) => {
  //if (action.farmGood){
  //  debugger 
  //}
  switch(action.type) {
    case 'UPDATE_FARMGOOD_SUCCESS':
      const editedFarmgood = Object.assign({}, action.farmGood)
      const editState = [...state.farmGoods.filter(farmgood => farmgood.id !== action.farmGood.id)]
      editState.push(editedFarmgood)
      return editState 
      /*
      [
        ...state.farmGoods.filter(farmgood => farmgood.id !== action.farmGood.id), 
        Object.assign({}, action.farmGood),
      ]
      */
      //<Route render={({history}) => 
      //  { history.push('/')}}
      //  </Route>
      //history.pushState('/')
    case 'GET_FARMGOOD_SUCCESS':
      return action.farmGoods
    case 'CREATE_FARMGOOD_SUCCESS':
      return state.concat(action.farmGood);
    case 'DELETE_FARMGOOD_SUCCESS':
      return
        const newState = Object.assign([], state);
        const indexOfFarmgoodToDelete = state.findIndex(farmGood => {
        return farmGood.id == action.farmGood.id
        })
        newState.splice(indexOfFarmgoodToDelete, 1)

        //browserHistory.push('/farm-goods');
        return newState;
    default:
      return state
  }
}


