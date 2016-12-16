// @flow

import React from 'react';
import ActorItem from './uml/ActorItem';
import UseCaseItem from './uml/UseCaseItem';
import type { Actor, UseCase, UMLComponents } from '../types';

type CanvasProps = {
  components: UMLComponents;
  onMove: (id: number, x: number, y: number) => void;
  onNameChange: (id: number, name: string) => void;
};

const canvasStyle = {
  background: 'cornsilk'
};

const Canvas = ({ components, onMove, onNameChange }: CanvasProps) => {
  const renderActor = (actor: Actor) => <ActorItem key={actor.id} {...actor} onMove={onMove} onNameChange={onNameChange} />
  const renderUseCase = (useCase: UseCase) => <UseCaseItem key={useCase.id} {...useCase} onMove={onMove} onNameChange={onNameChange} />

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
