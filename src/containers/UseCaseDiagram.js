import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/use-case-diagram/Canvas';
import Toolbox from '../components/use-case-diagram/Toolbox';
import * as actions from '../actions';

const UseCaseDiagram = (props) => (
  <div className='tile is-ancestor is-full-height'>
    <Toolbox onClick={props.toolboxSelection} toolbox={props.toolbox} />
    <Canvas onMove={props.onMove} deleteComponent={props.deleteComponent}
      onNameChange={props.onNameChange} umlComponentLink={props.umlComponentLink}
      canvasClick={props.canvasClick} components={props.components}
      toolbox={props.toolbox} />
  </div>
);

const mapStateToProps = ({ useCaseDiagram }, ownProps) => ({
  components: useCaseDiagram.components,
  toolbox: useCaseDiagram.toolbox
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
  toolboxSelection: type => {
    dispatch(actions.toolboxSelection(type));
  },
  canvasClick: (x, y) => {
    dispatch(actions.canvasClick(x, y));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram);
