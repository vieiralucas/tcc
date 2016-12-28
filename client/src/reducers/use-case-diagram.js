import { combineReducers } from 'redux';

import components from './use-case-diagram/components';
import linking from './use-case-diagram/linking';
import toolbox from './use-case-diagram/toolbox';

export default combineReducers({
  components,
  linking,
  toolbox
});
