import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: [],
  page: 1
})

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_ALL_DATA:
      console.log('ok')
      return state.set('data', action.data)
    case actionTypes.GET_PAGE:
      // return state;
      return state.set('page', parseInt(localStorage.getItem('page')))
    case actionTypes.CHANGE_PAGE:
      console.log('page', action.page)
      return state.set('page', action.page)
    default:
      return state;
  }
}

