import { combineReducers } from 'redux';

import components from './components';
import linking from './linking';
import toolbox from './toolbox';

export default combineReducers({
  components,
  linking,
  toolbox
});
