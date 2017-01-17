import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import useCaseDiagram from './use-case-diagram';
import login from './login';

const rootReducer = combineReducers({
  useCaseDiagram,
	login,
  routing
})

export default rootReducer
