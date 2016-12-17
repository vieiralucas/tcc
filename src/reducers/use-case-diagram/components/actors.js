import { UML_COMPONENT_MOVE, UML_COMPONENT_NAME_CHANGE } from '../../../actions';

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
  default:
    return actors;
  }
};

export default actors;
