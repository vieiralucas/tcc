import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import ActorItem from './uml/ActorItem';
import UseCaseItem from './uml/UseCaseItem';
import ActorUseCaseAssociationItem from './uml/ActorUseCaseAssociationItem';
import UseCaseAssociationItem from './uml/UseCaseAssociationItem';

const styles = {
  position: 'relative'
};

const umlComponentTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();

    if (item.from === 'toolbox') {
      const initial = monitor.getInitialSourceClientOffset();
      const itemBounding = item.bounding;
      const x = Math.round(initial.x + delta.x - itemBounding.width / 2);
      const y = Math.round(initial.y + delta.y + itemBounding.height / 2);

      component.createUMLComponent(x, y, item.type);
      return;
    }

    const x = Math.round(item.x + delta.x);
    const y = Math.round(item.y + delta.y);

    component.moveUMLComponent(item.id, x, y, item.type);
  }
};

class Canvas extends Component {
  moveUMLComponent(id, x, y, type) {
    this.props.onMove(id, x, y, type);
  }

  createUMLComponent(x, y, type) {
    this.props.addComponent(x, y, type);
  }

  render() {
    const {
      components,
      onMove,
      onNameChange,
      deleteComponent,
      connectDropTarget,
      umlComponentLink,
      toggleUseCaseAssociationType
    } = this.props;

    const renderActor = actor => <ActorItem key={actor.id} {...actor} onMove={onMove} onNameChange={onNameChange} umlComponentLink={umlComponentLink} />
    const renderUseCase = useCase => <UseCaseItem key={useCase.id} {...useCase} onMove={onMove} onNameChange={onNameChange} umlComponentLink={umlComponentLink} />
    const renderActorUseCaseAssociation = association => <ActorUseCaseAssociationItem key={association.id} {...association} deleteComponent={deleteComponent} />;
    const renderUseCaseAssociation = association => <UseCaseAssociationItem key={association.id} {...association} toggleUseCaseAssociationType={toggleUseCaseAssociationType} deleteComponent={deleteComponent} />

    const renderComponents = () => {
      const actorsJSx = components.actors.map(renderActor);
      const useCasesJsx = components.useCases.map(renderUseCase);
      const actorUseCaseAssociationsJsx = components.actorUseCaseAssociations.map(renderActorUseCaseAssociation);
      const useCaseAssociationsJSx = components.useCaseAssociations.map(renderUseCaseAssociation);

      const componentsJsx = actorsJSx.concat(useCasesJsx)
        .concat(actorUseCaseAssociationsJsx)
        .concat(useCaseAssociationsJSx);

      return componentsJsx;
    };

    return connectDropTarget(
      <div className='tile canvas' style={styles}>
        { renderComponents() }
      </div>
    );
  }
}

const collect = connect => ({
  connectDropTarget: connect.dropTarget()
});

export default DropTarget('UML_COMPONENTS', umlComponentTarget, collect)(Canvas);
