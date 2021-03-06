import {
  UML_COMPONENT_MOVE,
  UML_COMPONENT_NAME_CHANGE,
  UML_COMPONENT_BOUND_UPDATE,
  ADD_COMPONENT
} from '../../../actions/use-case-diagram';

const actors = (actors = [], action) => {
  switch (action.type) {
  case UML_COMPONENT_BOUND_UPDATE:
    return actors.map(c => {
      if (c._id === action._id) {
        return { ...c, bound: action.bound };
      }

      return c;
    });
  case UML_COMPONENT_MOVE:
    return actors.map(c => {
      if (c._id === action._id) {
        return { ...c, x: action.x, y: action.y };
      }

      return c;
    });
  case UML_COMPONENT_NAME_CHANGE:
    return actors.map(c => {
      if (c._id === action._id) {
        return { ...c, name: action.name };
      }

      return c;
    });
  case ADD_COMPONENT:
    if (action.componentType === 'actor') {
      return actors.concat([{
        ...action.component,
        type: 'actor',
        x: action.x,
        y: action.y
      }]);
    }

    return actors;
  default:
    return actors;
  }
};

export default actors;
