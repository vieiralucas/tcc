import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import useCaseDiagram from './use-case-diagram';
import login from './login';
import projects from './projects';
import usecases from './usecases';

const rootReducer = combineReducers({
  useCaseDiagram,
	login,
  routing,
  projects,
  usecases
});

export default rootReducer
