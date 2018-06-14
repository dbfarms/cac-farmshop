//import { browserHistory } from 'react-router-dom';
//import {withRouter} from "react-router-dom";

export default (state = {all: {}, editing: {}}, action) => {
  switch(action.type) {
    case 'UPDATE_FARMGOOD_SUCCESS':
      const editedFarmgood = Object.assign({}, action.farmGood)
      const editState = [...state.data.filter(farmgood => farmgood.id !== action.farmGood.data.id)]
      editState.push(editedFarmgood)
      //debugger 
      return (
        editState 
      );
    case 'GET_A_FARMGOOD_SUCCESS':
      //debugger 
      const single_farmGood = action.farmGood
      //debugger
      return { ...state, editing: single_farmGood }
    case 'GET_FARMGOOD_SUCCESS':
      //debugger 
      return {...state, all: action.farmGoods}
    case 'CREATE_FARMGOOD_SUCCESS':
    const newState1 = Object.assign([], state)
      return (
        newState1.data.concat(action.farmGood.data)
      )
    case 'DELETE_FARMGOOD_SUCCESS':
        const newState = Object.assign([], state);
        const indexOfFarmgoodToDelete = state.data.findIndex(farmGood => {
        return farmGood.id == action.farmGood.id
        })
        if (indexOfFarmgoodToDelete > -1) {
        newState.data.splice(indexOfFarmgoodToDelete, 1)
        }
        //debugger 
        return (
          newState
        );
    case 'GET_ALL_FARMERGOODS_SUCCESS':
        return action.farmgoods.data
    default:
      return state
  }
}


/*

//import { browserHistory } from 'react-router-dom';
//import {withRouter} from "react-router-dom";

export default (state = [], action) => {
  switch(action.type) {
    case 'UPDATE_FARMGOOD_SUCCESS':
      const editedFarmgood = Object.assign({}, action.farmGood)
      const editState = [...state.data.filter(farmgood => farmgood.id !== action.farmGood.data.id)]
      editState.push(editedFarmgood)
      //debugger 
      return (
        editState 
      );
    case 'GET_A_FARMGOOD_SUCCESS':
      debugger 
      const single_farmGood = action.farmGood
      //debugger
      return (
        single_farmGood
      )
    case 'GET_FARMGOOD_SUCCESS':
      debugger 
      return action.farmGoods
    case 'CREATE_FARMGOOD_SUCCESS':
    const newState1 = Object.assign([], state)
      return (
        newState1.data.concat(action.farmGood.data)
      )
    case 'DELETE_FARMGOOD_SUCCESS':
        const newState = Object.assign([], state);
        const indexOfFarmgoodToDelete = state.data.findIndex(farmGood => {
        return farmGood.id == action.farmGood.id
        })
        if (indexOfFarmgoodToDelete > -1) {
        newState.data.splice(indexOfFarmgoodToDelete, 1)
        }
        //debugger 
        return (
          newState
        );
    case 'GET_ALL_FARMERGOODS_SUCCESS':
        return action.farmgoods.data
    default:
      return state
  }
}





*/