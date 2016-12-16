import { combineReducers } from 'redux';

import { UML_COMPONENT_MOVE, UML_COMPONENT_NAME_CHANGE } from '../actions';

const actor1 = { id: 1, type: 'actor', name: 'lucas', x: 300, y: 10 };
const useCase1 = { id: 2, type: 'use-case', name: 'cadastrar usuário', x: 20, y: 20 };

const association1 = {
  id: 3,
  type: 'association',
  name: 'lucas - cadastrar usuário',
  useCaseCord: {
    id: 2,
    x: 300,
    y: 10
  },
  actorCord: {
    id: 1,
    x: 20,
    y: 20
  }
};

const hardCodedComponents = {
  actors: [actor1],
  useCases: [useCase1],
  associations: [association1]
};

const moveComponents = (components, action) => components.map(c => {
  if (c.id === action.id) {
    return { ...c, x: action.x, y: action.y };
  }

  return c;
});

const changeComponentsName = (components, action) => components.map(c => {
  if (c.id === action.id) {
    return { ...c, name: action.name };
  }

  return c;
});

const actors = (actors = hardCodedComponents.actors, action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    return moveComponents(actors, action);
  case UML_COMPONENT_NAME_CHANGE:
    return changeComponentsName(actors, action);
  default:
    return actors;
  }
};

const useCases = (useCases = hardCodedComponents.useCases, action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    return moveComponents(useCases, action);
  case UML_COMPONENT_NAME_CHANGE:
    return changeComponentsName(useCases, action);
  default:
    return useCases;
  }
};

const associations = (associations = hardCodedComponents.associations, action) => {
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

const components = combineReducers({
  actors,
  useCases,
  associations
});

export default combineReducers({
  components
});
