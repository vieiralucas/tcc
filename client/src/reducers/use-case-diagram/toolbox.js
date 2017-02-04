import { TOOLBOX_SELECTION, CLEAR_TOOLBOX } from '../../actions/use-case-diagram';

const initial = {
  selected: null
};

const toolbox = (state = initial, action) => {
  switch(action.type) {
    case TOOLBOX_SELECTION:
      return { selected: action.componentType };
    case CLEAR_TOOLBOX:
      return initial;
    default:
      return state;
  }
};

export default toolbox;
