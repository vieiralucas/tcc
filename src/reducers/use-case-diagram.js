// @flow

import { combineReducers } from 'redux';

import { UML_COMPONENT_MOVE, UML_COMPONENT_NAME_CHANGE } from '../actions';

const mock = {
  components: [
    { id: 1, type: 'actor', name: 'lucas', x: 10, y: 10 },
    { id: 2, type: 'use-case', name: 'cadastrar usuário', x: 20, y: 20 }
  ]
};

const components = (state = mock.components, action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    return state.map(s => {
      if (s.id === action.id) {
        return { ...s, x: action.x, y: action.y };
      }

      return s;
    });
  case UML_COMPONENT_NAME_CHANGE:
    return state.map(s => {
      if (s.id === action.id) {
        return { ...s, name: action.name };
      }

      return s;
    });
  default:
    return state;
  }
};

export default combineReducers({
  components
});
