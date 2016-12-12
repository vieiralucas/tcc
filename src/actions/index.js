export const UML_COMPONENT_MOVE = 'UML_COMPONENT_MOVE';

export const umlComponentMove = (id: number, x: number, y: number) => ({
  type: UML_COMPONENT_MOVE,
  id, x, y
});
