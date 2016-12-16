import React from 'react';
import ActorItem from './uml/ActorItem';
import UseCaseItem from './uml/UseCaseItem';
import AssociationItem from './uml/AssociationItem';

const canvasStyle = {
  background: 'cornsilk'
};

const Canvas = ({ components, onMove, onNameChange }) => {
  const renderActor = (actor) => <ActorItem key={actor.id} {...actor} onMove={onMove} onNameChange={onNameChange} />
  const renderUseCase = (useCase) => <UseCaseItem key={useCase.id} {...useCase} onMove={onMove} onNameChange={onNameChange} />
  const renderAssociation = (association) => {
    const actor = components.actors.find(a => a.id === association.actorId);
    const useCase = components.useCases.find(u => u.id === association.useCaseId);

    return <AssociationItem key={association.id} {...association} x1={actor.x} y1={actor.y} x2={useCase.x} y2={useCase.y} />;
  }

  const renderComponents = () => {
    const actorsJSx = components.actors.map(renderActor);
    const useCasesJsx = components.useCases.map(renderUseCase);
    const associationsJsx = components.associations.map(renderAssociation);

    const componentsJsx = actorsJSx.concat(useCasesJsx).concat(associationsJsx);

    return componentsJsx;
  };


  return (
    <div style={canvasStyle}>
      { renderComponents() }
    </div>
  );
};

export default Canvas;
