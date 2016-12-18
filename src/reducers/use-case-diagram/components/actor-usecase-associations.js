import _ from 'lodash';
import uuid from 'uuid';
import { UML_COMPONENT_MOVE, UML_COMPONENT_DELETE, UML_COMPONENT_ADD_ASSOCIATION } from '../../../actions';

const association1 = {
  id: 3,
  type: 'association',
  useCase: {
    id: 2,
    x: 200,
    y: 100
  },
  actor: {
    id: 1,
    x: 400,
    y: 100
  }
};

const associationExists = (associations, actorId, useCaseId) =>
  associations.some(a => a.actor.id === actorId && a.useCase.id === useCaseId);

const associations = (associations = [association1], action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    if (action.componentType === 'actor') {
      return associations.map(a => {
        if (a.actor.id === action.id) {
          return { ...a, actor: { ...a.actor, x: action.x, y: action.y }};
        }

        return a;
      });
    }

    if (action.componentType === 'use-case') {
      return associations.map(a => {
        if (a.useCase.id === action.id) {
          return { ...a, useCase: { ...a.useCase, x: action.x, y: action.y }};
        }

        return a;
      });
    }

    return associations;
  case UML_COMPONENT_DELETE:
    if (!action.componentType === 'association') {
      return associations;
    }

    const index = _.findIndex(associations, a => a.id === action.id);
    if (index !== -1) {
      return [...associations.slice(0, index), ...associations.slice(index + 1)];
    } else {
      return associations;
    }
  case UML_COMPONENT_ADD_ASSOCIATION:
    const useCase = action.comp1.type === 'use-case' ? action.comp1 : action.comp2;
    const actor = action.comp1.type === 'actor' ? action.comp1 : action.comp2;

    if (associationExists(associations, actor.id, useCase.id)) {
      return associations;
    }

    return associations.concat([{
      type: 'association',
      id: uuid.v1(),
      useCase, actor
    }]);
  default:
    return associations;
  }
};

export default associations;
