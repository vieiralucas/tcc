import {
  TOOLBOX_SELECTION,
  CLEAR_TOOLBOX,
} from '../../actions/use-case-diagram';

import { USECASES_FETCHED } from '../../actions/usecases';
import { ACTORS_FETCHED } from '../../actions/actors';

const initial = {
  selected: null,
  items: {
    actors: [],
    usecases: []
  }
};

const toolbox = (state = initial, action) => {
  switch(action.type) {
    case TOOLBOX_SELECTION:
      return { selected: action.componentType };
    case CLEAR_TOOLBOX:
      return initial;
    case USECASES_FETCHED:
      return { ...state, items: { ...state.items, usecases: action.usecases } };
    case ACTORS_FETCHED:
      return { ...state, items: { ...state.items, actors: action.actors } };
    default:
      return state;
  }
};

export default toolbox;
