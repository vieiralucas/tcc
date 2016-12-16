// @flow

import { combineReducers } from 'redux';

import { UML_COMPONENT_MOVE, UML_COMPONENT_NAME_CHANGE } from '../actions';

import type { UMLComponents, Actor, UseCase, Association } from '../types';

const actor1: Actor = { id: 1, type: 'actor', name: 'lucas', x: 300, y: 10 };
const useCase1: UseCase = { id: 2, type: 'use-case', name: 'cadastrar usuário', x: 20, y: 20 };

const association1: Association = {
  id: 3,
  type: 'association',
  name: 'lucas - cadastrar usuário',
  useCaseId: 2,
  actorId: 1
};

const hardCodedComponents: UMLComponents = {
  actors: [actor1],
  useCases: [useCase1],
  associations: [association1]
};

const components = (components: UMLComponents = hardCodedComponents, action: Object): UMLComponents => {
  const move = components => components.map(c => {
    if (c.id === action.id) {
      return { ...c, x: action.x, y: action.y };
    }

    return c;
  });

  const changeName = components => components.map(c => {
    if (c.id === action.id) {
      return { ...c, name: action.name };
    }

    return c;
  });

  switch (action.type) {
  case UML_COMPONENT_MOVE:
    switch (action.componentType) {
    case 'actor':
      components.actors = move(components.actors)
      break;
    case 'use-case':
      components.useCases = move(components.useCases)
      break;
    case 'association':
      components.associations = move(components.associations)
      break;
    default:
      throw new Error(`Unexpected type of uml component at componentMoveAction: ${action.type}`);
    }

    return components;
  case UML_COMPONENT_NAME_CHANGE:
    switch (action.componentType) {
    case 'actor':
      components.actors = changeName(components.actors)
      break;
    case 'use-case':
      components.useCases = changeName(components.useCases)
      break;
    case 'association':
      components.associations = changeName(components.associations)
      break;
    default:
      throw new Error(`Unexpected type of uml component at componentMoveAction: ${action.type}`);
    }

    return components;
  default:
    return components;
  }
};

export default combineReducers({
  components
});
