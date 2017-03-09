import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Canvas from '../components/use-case-diagram/Canvas';
import Toolbox from '../components/use-case-diagram/Toolbox';
import * as actions from '../actions/use-case-diagram';

class UsecaseDiagram extends Component {
  render() {
    const props = this.props;

    return (
      <div className='tile is-ancestor is-full-height'>
        <Toolbox onClick={props.toolboxSelection} toolbox={props.toolbox} />
        <Canvas onMove={props.onMove} deleteComponent={props.deleteComponent}
          onNameChange={props.onNameChange} umlComponentLink={props.umlComponentLink}
          addComponent={props.addComponent} toggleUseCaseAssociationType={props.toggleUseCaseAssociationType}
          boundUpdate={props.boundUpdate} components={props.components} />
      </div>
    );
  }
}

const mapStateToProps = ({ useCaseDiagram, user }, ownProps) => ({
  components: useCaseDiagram.components,
  toolbox: useCaseDiagram.toolbox,
  user
});

const mapDispatchToProps = dispatch => ({
  onMove: (id, x, y, componentType) => {
    dispatch(actions.umlComponentMove(id, x, y, componentType));
  },
  deleteComponent: (id, componentType) => {
    dispatch(actions.umlComponentDelete(id, componentType));
  },
  onNameChange: (id, name) => {
    dispatch(actions.umlComponentNameChange(id, name));
  },
  umlComponentLink: (id, componentType) => {
    dispatch(actions.umlComponentLink(id, componentType));
  },
  boundUpdate: (id, bound) => {
    dispatch(actions.umlComponentBoundUpdate(id, bound));
  },
  toolboxSelection: type => {
    dispatch(actions.toolboxSelection(type));
  },
  addComponent: (x, y, type) => {
    dispatch(actions.addComponent(x, y, type));
  },
  toggleUseCaseAssociationType: id => {
    dispatch(actions.toggleUseCaseAssociationType(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragDropContext(HTML5Backend)(UsecaseDiagram));
