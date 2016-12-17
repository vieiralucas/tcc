export const UML_COMPONENT_MOVE = 'UML_COMPONENT_MOVE';
export const umlComponentMove = (id, x, y, componentType) => ({
  type: UML_COMPONENT_MOVE,
  id, x, y, componentType
});

export const UML_COMPONENT_NAME_CHANGE = 'UML_COMPONENT_NAME_CHANGE';
export const umlComponentNameChange = (id, name) => ({
  type: UML_COMPONENT_NAME_CHANGE,
  id, name
});

export const UML_COMPONENT_DELETE = 'UML_COMPONENT_DELETE';
export const umlComponentDelete = (id, componentType) => ({
  type: UML_COMPONENT_DELETE,
  id, componentType
});

export const UML_COMPONENT_ADD_ASSOCIATION = 'UML_COMPONENT_ADD_ASSOCIATION';
export const umlComponentAddAssociation = (comp1, comp2) => ({
  type: UML_COMPONENT_ADD_ASSOCIATION,
  comp1, comp2
});

export const UML_COMPONENT_RESET_LINK = 'UML_COMPONENT_RESET_LINK';
export const umlComponentResetLink = () => ({
  type: UML_COMPONENT_RESET_LINK,
});

export const UML_COMPONENT_LINK = 'UML_COMPONENT_LINK';
export const umlComponentLink = component => (dispatch, getState) => {
  dispatch({
    type: UML_COMPONENT_LINK,
    component
  });

  const link = getState().useCaseDiagram.linking;
  if (link.comp1 && link.comp2) {
    dispatch(umlComponentAddAssociation(link.comp1, link.comp2));
    dispatch(umlComponentResetLink());
  }
};
