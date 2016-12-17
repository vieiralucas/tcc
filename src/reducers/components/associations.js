import { UML_COMPONENT_MOVE } from '../../actions';

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
  default:
    return associations;
  }
};

export default associations;
