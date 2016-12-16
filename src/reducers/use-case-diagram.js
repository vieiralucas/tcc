// @flow

import { combineReducers } from 'redux';

import { UML_COMPONENT_MOVE, UML_COMPONENT_NAME_CHANGE } from '../actions';

import type { UMLComponents } from '../types';

const hardCodedComponents: UMLComponents = [
  { id: 1, type: 'actor', name: 'lucas', x: 10, y: 10 },
  { id: 2, type: 'use-case', name: 'cadastrar usuário', x: 20, y: 20 }
];

const components = (components: UMLComponents = hardCodedComponents, action: Object): UMLComponents => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    return components.map(s => {
      if (s.id === action.id) {
        return { ...s, x: action.x, y: action.y };
      }

      return s;
    });
  case UML_COMPONENT_NAME_CHANGE:
    return components.map(s => {
      if (s.id === action.id) {
        return { ...s, name: action.name };
      }

      return s;
    });
  default:
    return components;
  }
};

export default combineReducers({
  components
});
