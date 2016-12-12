export const UML_COMPONENT_MOVE = 'UML_COMPONENT_MOVE';
export const umlComponentMove = (id: number, x: number, y: number) => ({
  type: UML_COMPONENT_MOVE,
  id, x, y
});

export const UML_COMPONENT_SELECTED = 'UML_COMPONENT_SELECTED';
export const umlComponentSelected = (id: number) => ({
  type: UML_COMPONENT_SELECTED,
  id
});

export const UML_COMPONENT_UNSELECTED = 'UML_COMPONENT_UNSELECTED';
export const umlComponentUnselected = (id: number) => ({
  type: UML_COMPONENT_UNSELECTED,
  id
});
