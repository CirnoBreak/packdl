import * as actionTypes from './actionTypes';

export const getAllData = (data) => (dispatch) => {
  return dispatch({type: actionTypes.GET_ALL_DATA, data});
}

export const getPage = () => (dispatch) => {
  return dispatch({type: actionTypes.GET_PAGE})
}

export const changePage = (page) => (dispatch) => {
  return dispatch({type: actionTypes.CHANGE_PAGE, page})
}