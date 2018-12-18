import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';

const initialState = fromJS({
  data: [],
  page: 1,
  search: '',
  filterData: [],
  pageSize: 10
})

export const reducer = (state = initialState, action) => {
  switch(action.type) {
    case actionTypes.GET_ALL_DATA:
      return state.set('data', action.data);
    case actionTypes.GET_PAGE:
      return state.set('page', parseInt(localStorage.getItem('page')) || 1);
    case actionTypes.GET_PAGE_SIZE:
      return state.set('pageSize', parseInt(localStorage.getItem('pageSize')) || 10)
    case actionTypes.CHANGE_PAGE:
      localStorage && localStorage.setItem('page', action.page);
      return state.set('page', action.page);
    case actionTypes.CHANGE_PAGE_SIZE:
      localStorage && localStorage.setItem('pageSize', action.pageSize);
      return state.set('pageSize', action.pageSize);
    case actionTypes.INPUT_SEARCH:
      localStorage.setItem('page', 1);
      return state.merge({
        search: action.input,
        filterData: state
                      .get('data')
                      .toJS()
                      .filter(
                        item => item.attributes.name.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "")
                        .toLowerCase()
                        .includes(
                          action.input.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/g, "")
                          .toLowerCase()
                        )
                      ),
        page: 1
      });
    default:
      return state;
  }
}

