// @flow

type UMLComponentProps = {
  id: number;
  name: string;
  x: number;
  y: number;
  onMove: (id: number, x: number, y: number) => void;
};

export type ActorProps = UMLComponentProps
export type UseCaseProps = UMLComponentProps