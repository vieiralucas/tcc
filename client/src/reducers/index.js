import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import useCaseDiagram from './use-case-diagram';
import login from './login';
import projects from './projects';
import usecases from './usecases';
import actors from './actors';

const rootReducer = combineReducers({
  useCaseDiagram,
	login,
  routing,
  projects,
  usecases,
  actors
});

export default rootReducer
