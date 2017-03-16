import {
  UML_COMPONENT_MOVE,
  UML_COMPONENT_NAME_CHANGE,
  UML_COMPONENT_BOUND_UPDATE,
  ADD_COMPONENT
} from '../../../actions/use-case-diagram';

const useCases = (useCases = [], action) => {
  switch (action.type) {
  case UML_COMPONENT_BOUND_UPDATE:
    return useCases.map(c => {
      if (c._id === action._id) {
        return { ...c, bound: action.bound };
      }

      return c;
    });
  case UML_COMPONENT_MOVE:
    return useCases.map(c => {
      if (c._id === action._id) {
        return { ...c, x: action.x, y: action.y };
      }

      return c;
    });
  case UML_COMPONENT_NAME_CHANGE:
    return useCases.map(c => {
      if (c._id === action._id) {
        return { ...c, name: action.name };
      }

      return c;
    });
  case ADD_COMPONENT:
    if (action.componentType === 'usecase') {
      return useCases.concat([{
        ...action.component,
        type: 'usecase',
        x: action.x,
        y: action.y
      }]);
    }

    return useCases;
  default:
    return useCases;
  }
};

export default useCases;
