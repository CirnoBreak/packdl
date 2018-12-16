import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: []
})

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_ALL_DATA:
      console.log('ok')
      return state.set('data', action.data)
    default:
      return state;
  }
}

