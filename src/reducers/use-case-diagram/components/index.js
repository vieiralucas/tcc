import { combineReducers } from 'redux';

import actors from './actors';
import useCases from './use-cases';
import actorUseCaseAssociations from './actor-usecase-associations';
import useCaseAssociations from './usecase-associations';

export default combineReducers({
  actors,
  useCases,
  actorUseCaseAssociations,
  useCaseAssociations
});
