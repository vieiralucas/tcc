// @flow

import type { Action } from '../types';

export const UML_COMPONENT_MOVE = 'UML_COMPONENT_MOVE';
export const umlComponentMove = (id: number, x: number, y: number, componentType: string): Action => ({
  type: UML_COMPONENT_MOVE,
  id, x, y, componentType
});

export const UML_COMPONENT_NAME_CHANGE = 'UML_COMPONENT_NAME_CHANGE';
export const umlComponentNameChange = (id: number, name: string): Action => ({
  type: UML_COMPONENT_NAME_CHANGE,
  id, name
});

