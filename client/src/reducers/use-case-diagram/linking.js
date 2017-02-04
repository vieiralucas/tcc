import { UML_COMPONENT_LINK, UML_COMPONENT_RESET_LINK } from '../../actions/use-case-diagram';

const initial = {
  comp1: null,
  comp2: null
};

const linking = (linking = initial, action) => {
  switch(action.type) {
  case UML_COMPONENT_LINK:
    if (!linking.comp1) {
      return {
        ...linking,
        comp1: action.component
      };
    }

    if (linking.comp1.id === action.component.id) {
      return linking;
    }

    return {
      ...linking,
      comp2: action.component
    };
  case UML_COMPONENT_RESET_LINK:
    return initial;
  default:
    return linking;
  }
};

export default linking;
