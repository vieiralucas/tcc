// @flow

import React from 'react';
import Actor from './uml/Actor';
import UseCase from './uml/UseCase';

type CanvasProps = {
  width: number;
  height: number;
  components: Array<any>;
  onComponentMove: (id: number, x: number, y: number) => void;
  onComponentSelected: (id: number) => void;
  onComponentUnselected: (id: number) => void;
  selected: number;
};

const canvasStyle = {
  background: 'cornsilk'
};

const Canvas = (props: CanvasProps) => {
  const renderActor = (actor: any) => {
    const { id, name, x, y } = actor;
    const isSelected = props.selected === actor.id;

    return <Actor key={id} id={id} name={name} x={x} y={y} onMove={props.onComponentMove} isSelected={isSelected}  onSelect={props.onComponentSelected} onUnselect={props.onComponentUnselected} />
  };

  const renderUseCase = (useCase: any) => {
    const { id, name, x, y } = useCase;
    const isSelected = props.selected === useCase.id;

    return <UseCase key={id} id={id} name={name} x={x} y={y} onMove={props.onComponentMove} isSelected={isSelected} onSelect={props.onComponentSelected} onUnselect={props.onComponentUnselected} />
  };

  const renderComponents = () => {
    const { components } = props;
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


  const { width, height } = props;

  return (
    <svg width={width} height={height} style={canvasStyle}>
      { renderComponents() }
    </svg>
  );
};

export default Canvas;
