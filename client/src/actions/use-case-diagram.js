export const UML_COMPONENT_MOVE = 'UML_COMPONENT_MOVE';
export const umlComponentMove = (_id, x, y, componentType) => ({
  type: UML_COMPONENT_MOVE,
  _id, x, y, componentType
});

export const UML_COMPONENT_NAME_CHANGE = 'UML_COMPONENT_NAME_CHANGE';
export const umlComponentNameChange = (_id, name) => ({
  type: UML_COMPONENT_NAME_CHANGE,
  _id, name
});

export const UML_COMPONENT_DELETE = 'UML_COMPONENT_DELETE';
export const umlComponentDelete = (_id, componentType) => ({
  type: UML_COMPONENT_DELETE,
  _id, componentType
});

export const ADD_USE_CASE_ASSOCIATION = 'ADD_USE_CASE_ASSOCIATION';
export const addUseCaseAssociation = (comp1, comp2) => ({
  type: ADD_USE_CASE_ASSOCIATION,
  useCase1: comp1,
  useCase2: comp2
});

export const UML_COMPONENT_ADD_ASSOCIATION = 'UML_COMPONENT_ADD_ASSOCIATION';
export const umlComponentAddAssociation = (comp1, comp2) => dispatch => {
  const types = [comp1.type, comp2.type].sort();
  if (types[0] === 'actor' && types[1] === 'usecase') {
    dispatch({
      type: UML_COMPONENT_ADD_ASSOCIATION,
      comp1, comp2
    });
    return;
  }

  if (types[0] === 'usecase' && types[1] === 'usecase') {
    dispatch(addUseCaseAssociation(comp1, comp2));
  }
};

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
    if (link.comp1._id !== link.comp2._id) {
      dispatch(umlComponentAddAssociation(link.comp1, link.comp2));
    }

    dispatch(umlComponentResetLink());
  }
};

export const TOOLBOX_SELECTION = 'TOOLBOX_SELECTION';
export const toolboxSelection = componentType => ({
  type: TOOLBOX_SELECTION,
  componentType
});

export const ADD_COMPONENT = 'ADD_COMPONENT';
export const addComponent = (type, component) => ({
  type: ADD_COMPONENT,
  componentType: type,
  component,
  x: 100,
  y: 100
});

export const CLEAR_TOOLBOX = 'CLEAR_TOOLBOX';
export const clearToolbox = () => ({
  type: CLEAR_TOOLBOX
});

export const CANVAS_CLICK = 'CANVAS_CLICK';
export const canvasClick = (x, y) => (dispatch, getState) => {
  dispatch({
    type: CANVAS_CLICK,
    x, y
  });
};

export const TOGGLE_USE_CASE_ASSOCIATION_TYPE = 'TOGGLE_USE_CASE_ASSOCIATION_TYPE';
export const toggleUseCaseAssociationType = _id => ({
  type: TOGGLE_USE_CASE_ASSOCIATION_TYPE,
  _id
});

export const UML_COMPONENT_BOUND_UPDATE = 'UML_COMPONENT_BOUND_UPDATE';
export const umlComponentBoundUpdate = (_id, bound) => ({
  type: UML_COMPONENT_BOUND_UPDATE,
  _id, bound
});

