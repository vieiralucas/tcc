import { combineReducers } from 'redux';

import components from './use-case-diagram/components';
import linking from './use-case-diagram/linking';

export default combineReducers({
  components,
  linking
});
