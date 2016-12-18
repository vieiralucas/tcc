import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import ActorItem from './uml/ActorItem';
import UseCaseItem from './uml/UseCaseItem';
import AssociationItem from './uml/AssociationItem';

const styles = {
  position: 'relative'
};

const umlComponentTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const x = Math.round(item.x + delta.x);
    const y = Math.round(item.y + delta.y);

    component.moveBox(item.id, x, y, item.type);
  }
};

class Canvas extends Component {
  moveBox(id, x, y, type) {
    this.props.onMove(id, x, y, type);
  }

  handleCanvasClick({ pageX, pageY }) {
    this.props.canvasClick(pageX - pageX * 0.40, pageY + pageY * 0.1);
  }

  render() {
    const { components, onMove, onNameChange, deleteComponent, connectDropTarget, umlComponentLink } = this.props;

    const renderActor = actor => <ActorItem key={actor.id} {...actor} onMove={onMove} onNameChange={onNameChange} umlComponentLink={umlComponentLink} />
    const renderUseCase = useCase => <UseCaseItem key={useCase.id} {...useCase} onMove={onMove} onNameChange={onNameChange} umlComponentLink={umlComponentLink} />
    const renderAssociation = association => <AssociationItem key={association.id} {...association} deleteComponent={deleteComponent} />;

    const renderComponents = () => {
      const actorsJSx = components.actors.map(renderActor);
      const useCasesJsx = components.useCases.map(renderUseCase);
      const associationsJsx = components.associations.map(renderAssociation);

      const componentsJsx = actorsJSx.concat(useCasesJsx).concat(associationsJsx);

      return componentsJsx;
    };

    if (this.props.toolbox.selected) {
      return connectDropTarget(
        <div className='tile canvas' style={styles} onClick={this.handleCanvasClick.bind(this)}>
          { renderComponents() }
        </div>
      );
    }

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
