// @flow

type UMLComponentProps = {
  id: number;
  name: string;
  x: number;
  y: number;
  type: string;
  onMove: (id: number, x: number, y: number, componentType: string) => void;
  onNameChange: (id: number, name: string) => void;
};

export type ActorItemProps = UMLComponentProps
export type UseCaseItemProps = UMLComponentProps
export type AssociationItemProps = UMLComponentProps & {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export type Id = number;

export type Name = string;

export type Actor = {
  id: Id;
  type: string;
  name: Name;
  x: number;
  y: number;
}

export type UseCase = {
  id: Id;
  type: string;
  name: Name;
  x: number;
  y: number;
};

export type Association = {
  id: Id;
  type: string;
  name: Name;
  actorId: Id;
  useCaseId: Id;
};

export type UMLComponents = {
  actors: Actor[];
  useCases: UseCase[];
  associations: Association[];
};

export type UseCaseDiagramState = {
  components: UMLComponents;
};

export type State = {
  useCaseDiagram: UseCaseDiagramState;
};

export type Action = { type: string };

