// @flow

import React from 'react';
import Actor from './uml/Actor';
import UseCase from './uml/UseCase';

type CanvasProps = {
  components: Array<any>;
  onMove: (id: number, x: number, y: number) => void;
  onNameChange: (id: number, name: string) => void;
};

const canvasStyle = {
  background: 'cornsilk'
};

const Canvas = ({ components, onMove, onNameChange }: CanvasProps) => {
  const renderActor = (actor: any) => <Actor key={actor.id} {...actor} onMove={onMove} />
  const renderUseCase = (useCase: any) => <UseCase key={useCase.id} {...useCase} onMove={onMove} onNameChange={onNameChange} />

  const renderComponents = () => {
    const componentsJsx = components.map(component => {
      switch(component.type) {
      case 'actor':
        return renderActor(component);
      case 'use-case':
        return renderUseCase(component);
      default:
        throw new Error(`Unknown uml component: ${component.type}`);
      }
    });

    return componentsJsx;
  };


  return (
    <div style={canvasStyle}>
      { renderComponents() }
    </div>
  );
};

export default Canvas;
