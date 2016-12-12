// @flow

import { UML_COMPONENT_MOVE } from '../actions';
import type { Reducer } from 'redux';

const mock = [
  { id: 1, type: 'actor', name: 'lucas', x: 10, y: 10 },
  { id: 2, type: 'use-case', name: 'cadastrar usuário', x: 20, y: 20 }
];

const useCaseDiagram: Reducer = (state = mock, action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    let pos = 0;
    const component = state.find((c, i) => {
      pos = i;
      return c.id === action.id;
    });

    if (component) {
      const newComponent = Object.assign(component, { x: action.x, y: action.y });
      return [...state.slice(0, pos), newComponent, ...state.slice(pos + 1)];
    }

    return state;
  default:
    return state;
  }
};

export default useCaseDiagram;
