import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import useCaseDiagram from './use-case-diagram';
import user from './user';

const rootReducer = combineReducers({
  useCaseDiagram,
	user,
  routing
})

export default rootReducer
