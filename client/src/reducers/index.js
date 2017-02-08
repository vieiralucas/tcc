import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import useCaseDiagram from './use-case-diagram';
import login from './login';
import projects from './projects';

const rootReducer = combineReducers({
  useCaseDiagram,
	login,
  routing,
  projects
});

export default rootReducer
