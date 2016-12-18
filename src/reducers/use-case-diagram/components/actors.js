import uuid from 'uuid';

import { UML_COMPONENT_MOVE, UML_COMPONENT_NAME_CHANGE, ADD_COMPONENT } from '../../../actions';

const actor1 = { id: 1, type: 'actor', name: 'lucas', x: 400, y: 100 };

const actors = (actors = [actor1], action) => {
  switch (action.type) {
  case UML_COMPONENT_MOVE:
    return actors.map(c => {
      if (c.id === action.id) {
        return { ...c, x: action.x, y: action.y };
      }

      return c;
    });
  case UML_COMPONENT_NAME_CHANGE:
    return actors.map(c => {
      if (c.id === action.id) {
        return { ...c, name: action.name };
      }

      return c;
    });
  case ADD_COMPONENT:
    if (action.componentType === 'actor') {
      return actors.concat([{
        id: uuid.v1(),
        type: 'actor',
        name: 'Actor',
        x: action.x,
        y: action.y
      }]);
    }

    return actors;
  default:
    return actors;
  }
};

export default actors;
