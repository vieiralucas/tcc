// @flow

import React, {Element} from 'react';

type SelectableProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  onSelectedToggle: (isSelected: boolean) => void;
  children?: Element<any>;
};

const Selectable = (props: SelectableProps) => {
  const { x, y, width, height, isSelected, onSelectedToggle } = props;
  const strokeWidth = isSelected ? 1.2 : 0;

  return (
    <g x={x} y={y} width={width} height={height}
      onMouseEnter={() => onSelectedToggle(true)}
      onMouseLeave={() => onSelectedToggle(false)}>
      <rect x={x} y={y} width={width} height={height}
        fillOpacity={0} stroke='aquamarine' strokeWidth={strokeWidth} />
      {props.children}
    </g>
  );
};

export default Selectable;
