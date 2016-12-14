// @flow

import React from 'react';
import BaseUML from './BaseUML';
import type { UseCaseProps } from '../../types';

const UseCase = (props: UseCaseProps) => {
  const { name } = props;
  const fontSize = 10;
  const width = 200;
  const lines = name.match(/.{1,30}/g) || [];
  const height = fontSize * 3 * lines.length;

  const style = {
    fontSize: `${fontSize}px`,
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '100%',
    cursor: 'pointer',
    textAlign: 'center',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    width
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
