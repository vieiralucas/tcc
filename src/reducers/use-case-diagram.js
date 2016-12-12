// @flow

import { combineReducers } from 'redux';
import type { Reducer } from 'redux';

import { UML_COMPONENT_MOVE, UML_COMPONENT_SELECTED, UML_COMPONENT_UNSELECTED } from '../actions';

const mock = {
  components: [
    { id: 1, type: 'actor', name: 'lucas', x: 10, y: 10 },
    { id: 2, type: 'use-case', name: 'cadastrar usuário', x: 20, y: 20 }
  ]
};

const components: Reducer = (state = mock.components, action) => {
  if (action.type === UML_COMPONENT_MOVE) {
    let pos = 0;
    const component = state.find((c, i) => {
      pos = i;
      return c.id === action.id;
    });

    if (component) {
      const newComponent = { ...component, x: action.x, y: action.y };
      return [...state.slice(0, pos), newComponent, ...state.slice(pos + 1)];
    }
  }

  return state;
};

const selectedId: Reducer = (state = null, action) => {
  if (action.type === UML_COMPONENT_SELECTED) {
    return action.id;
  }

  if (action.type === UML_COMPONENT_UNSELECTED) {
    return null;
  }

  return state;
};

export default combineReducers({
  components,
  selectedId
});
