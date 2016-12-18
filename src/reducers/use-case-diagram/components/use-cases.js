import uuid from 'uuid';

import { UML_COMPONENT_MOVE, UML_COMPONENT_NAME_CHANGE, ADD_COMPONENT } from '../../../actions';

const useCase1 = { id: 2, type: 'use-case', name: 'cadastrar usuário', x: 200, y: 100 };

const useCases = (useCases = [useCase1], action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    return useCases.map(c => {
      if (c.id === action.id) {
        return { ...c, x: action.x, y: action.y };
      }

      return c;
    });
  case UML_COMPONENT_NAME_CHANGE:
    return useCases.map(c => {
      if (c.id === action.id) {
        return { ...c, name: action.name };
      }

      return c;
    });
  case ADD_COMPONENT:
    if (action.componentType === 'use-case') {
      return useCases.concat([{
        id: uuid.v1(),
        type: 'use-case',
        name: 'Use Case',
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
