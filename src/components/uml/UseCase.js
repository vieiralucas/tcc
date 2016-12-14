// @flow

import React from 'react';
import BaseUML from './BaseUML';
import type { UseCaseProps } from '../../types';

const UseCase = (props: UseCaseProps) => {
  const { name } = props;
  const fontSize = 10;
  const width = 200;
  const height = 70;

  const style = {
    fontSize: `${fontSize}px`,
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '100%',
    cursor: 'pointer',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    width,
    maxHeight: height
  };

  return (
    <BaseUML { ...props } width={width} height={height}>
      <div style={style}>
        <p>{ name }</p>
      </div>
    </BaseUML>
  );
};

export default UseCase;
