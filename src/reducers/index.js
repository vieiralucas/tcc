// @flow

import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import useCaseDiagram from './use-case-diagram';

const rootReducer = combineReducers({
  useCaseDiagram,
  routing
})

export default rootReducer
