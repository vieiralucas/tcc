// @flow

type UMLComponentProps = {
  id: number;
  name: string;
  x: number;
  y: number;
  isSelected: boolean;
  onMove: (id: number, x: number, y: number) => void;
  onSelect: (id: number) => void;
  onUnselect: (id: number) => void;
};

export type ActorProps = UMLComponentProps
export type UseCaseProps = UMLComponentProps
