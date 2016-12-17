import _ from 'lodash';
import { UML_COMPONENT_MOVE, UML_COMPONENT_DELETE } from '../../actions';

const association1 = { id: 3,
  type: 'association',
  name: 'lucas - cadastrar usuário',
  useCaseCord: {
    id: 2,
    x: 200,
    y: 100
  },
  actorCord: {
    id: 1,
    x: 400,
    y: 100
  }
};

const associations = (associations = [association1], action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    if (action.componentType === 'actor') {
      return associations.map(a => {
        if (a.actorCord.id === action.id) {
          return { ...a, actorCord: { ...a.actorCord, x: action.x, y: action.y }};
        }

        return a;
      });
    }

    if (action.componentType === 'use-case') {
      return associations.map(a => {
        if (a.useCaseCord.id === action.id) {
          return { ...a, useCaseCord: { ...a.useCaseCord, x: action.x, y: action.y }};
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
  default:
    return associations;
  }
};

export default associations;
