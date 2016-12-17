import { combineReducers } from 'redux';

import actors from './actors';
import useCases from './use-cases';
import associations from './associations';

export default combineReducers({ actors, useCases, associations });
