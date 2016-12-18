import _ from 'lodash';
import uuid from 'uuid';

import { ADD_USE_CASE_ASSOCIATION, UML_COMPONENT_MOVE, UML_COMPONENT_DELETE } from '../../../actions';

const useCaseAssociations = (associations = [], action) => {
  switch (action.type) {
  case ADD_USE_CASE_ASSOCIATION:
    return associations.concat([{
      id: uuid.v1(),
      type: 'usecase-association',
      associationType: 'INCLUDES',
      useCase1: action.useCase1,
      useCase2: action.useCase2
    }]);
  case UML_COMPONENT_MOVE:
    if (action.componentType === 'use-case') {
      return associations.map(a => {
        if (a.useCase1.id === action.id) {
          return { ...a, useCase1: { ...a.useCase1, x: action.x, y: action.y }};
        }

        if (a.useCase2.id === action.id) {
          return { ...a, useCase2: { ...a.useCase2, x: action.x, y: action.y }};
        }

        return a;
      });
    }

    return associations;
  case UML_COMPONENT_DELETE:
    if (!action.componentType === 'usecase-association') {
      return associations;
    }

    const index = _.findIndex(associations, a => a.id === action.id);
    if (index !== -1) {
      return [...associations.slice(0, index), ...associations.slice(index + 1)];
    } else {
      return associations;
    }
  default:
    return associations;
  }
};

export default useCaseAssociations;
