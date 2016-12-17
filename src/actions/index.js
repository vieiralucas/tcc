export const UML_COMPONENT_MOVE = 'UML_COMPONENT_MOVE';
export const umlComponentMove = (id, x, y, componentType): Action => ({
  type: UML_COMPONENT_MOVE,
  id, x, y, componentType
});

export const UML_COMPONENT_NAME_CHANGE = 'UML_COMPONENT_NAME_CHANGE';
export const umlComponentNameChange = (id, name): Action => ({
  type: UML_COMPONENT_NAME_CHANGE,
  id, name
});

export const UML_COMPONENT_DELETE = 'UML_COMPONENT_DELETE';
export const umlComponentDelete = (id, componentType): Action => ({
  type: UML_COMPONENT_DELETE,
  id, componentType
});
