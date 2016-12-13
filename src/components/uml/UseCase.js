// @flow

import React from 'react';
import BaseUML from './BaseUML';
import type { UseCaseProps } from '../../types';

const UseCase = (props: UseCaseProps) => {
  const { name, x, y } = props;
  const fontSize = 20;
  const width = 200;
  const lines = name.match(/.{1,30}/g) || [];
  const height = fontSize * 3 * lines.length;

  const nameStyle = {
    fontSize: `${fontSize}px`,
  };

  const tspans = lines.map((line, i) => <tspan x={'50%'} dy={'1.3em'} key={i}>{line}</tspan>);
  const useCaseSvg = (
    <svg x={x} y={y} width={width} height={height} cursor={'pointer'}>
      <ellipse cx={width / 2} cy={height / 2}
        rx={width / 2} ry={height / 2}
        fillOpacity={0} stroke="black" strokeWidth={1} />
      <text textAnchor={'middle'} style={nameStyle}>
        {tspans}
      </text>
    </svg>
  );

  return (
    <BaseUML { ...props } width={width} height={height}>
      { useCaseSvg }
    </BaseUML>
  );
};

export default UseCase;
