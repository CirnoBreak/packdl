

import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import * as actionTypes from './actionTypes';
import { fromJS } from 'immutable';
import { reducer } from './reducer'
const exampleInitialState = fromJS({})


export function makeStore (initialState = exampleInitialState) {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}