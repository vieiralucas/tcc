// @flow

import type { Store as ReduxStore, Dispatch as ReduxDispatch } from 'redux'

type UMLComponentProps = {
  id: number;
  name: string;
  x: number;
  y: number;
  onMove: (id: number, x: number, y: number) => void;
  onNameChange: (id: number, name: string) => void;
};

export type ActorProps = UMLComponentProps
export type UseCaseProps = UMLComponentProps

export type Id = number;

export type Name = string;

export type UMLComponent = {
  id: Id,
  type: string,
  name: Name,
  x: number,
  y: number
};

export type Actor = UMLComponent;
export type UseCase = UMLComponent;

export type UMLComponents = Array<UMLComponent>;

export type UseCaseDiagramState = {
  components: UMLComponents
};

export type State = {
  useCaseDiagram: UseCaseDiagramState
};

export type Action =
    { type: 'UML_COMPONENT_NAME_CHANGE', id: Id, name: Name }
  | { type: 'UML_COMPONENT_MOVE', id: Id, x: number, y: number }
  ;

export type Store = ReduxStore<State, Action>;

export type Dispatch = ReduxDispatch<Action>;
