import * as actionTypes from './actionTypes';

// 获取初始数据
export const getAllData = (data) => (dispatch) => {
  return dispatch({type: actionTypes.GET_ALL_DATA, data});
}

// 获取初始页数
export const getPage = () => (dispatch) => {
  return dispatch({type: actionTypes.GET_PAGE})
}

// 改变页数
export const changePage = (page) => (dispatch) => {
  return dispatch({type: actionTypes.CHANGE_PAGE, page})
}

// 搜索
export const inputSearch = (input) => (dispatch) => {
  return dispatch({ type: actionTypes.INPUT_SEARCH, input})
}