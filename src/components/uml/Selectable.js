// @flow

import React, { Element } from 'react';

type SelectableProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isSelected: boolean;
  children?: Element<any>;
};

const Selectable = (props: SelectableProps) => {
  const { x, y, width, height, isSelected } = props;

  if (isSelected) {
    return (
      <g x={ x } y={ y } width={ width } height={ height * 1.1 }>
        <rect x={ x } y={ y } width={ width } height={ height * 1.1 }
          fillOpacity={ 0 } stroke='aquamarine' strokeWidth={ 1.2 } />
        { props.children }
      </g>
    );
  }

  return props.children;
};

export default Selectable;
