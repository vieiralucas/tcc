// @flow

import { UML_COMPONENT_MOVE } from '../actions';

const mock = [
  { id: 1, type: 'actor', name: 'lucas', x: 10, y: 10 }
];

const useCaseDiagram = (state: any = mock, action: any) => {
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
