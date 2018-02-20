import { browserHistory } from 'react-router-dom';
//import {withRouter} from "react-router-dom";

export default (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_FARMGOOD_SUCCESS':
      debugger
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
     
    case 'GET_FARMGOOD_SUCCESS':
      return action.farmGoods
    case 'CREATE_FARMGOOD_SUCCESS':
    //debugger 
      return (
        state.concat(action.farmGood),
        this.props.history.push('/farm-goods')
      )
    case 'DELETE_FARMGOOD_SUCCESS':
        const newState = Object.assign([], state);
        //debugger //doesn't like state.findIndex, possibly state isn't array (consider something other than findIndex)
        const indexOfFarmgoodToDelete = state.data.findIndex(farmGood => {
        return farmGood.id == action.farmGood.id
        })
        newState.splice(indexOfFarmgoodToDelete, 1)
        return (
          newState
        );
    default:
      return state
  }
}


