import * as actionTypes from './actionTypes';

export const getAllData = (data) => (dispatch) => {
  return dispatch({type: actionTypes.GET_ALL_DATA, data});
}