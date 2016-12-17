import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import Toolbox from '../components/Toolbox';
import { umlComponentMove, umlComponentNameChange, umlComponentDelete, umlComponentLink } from '../actions';

const UseCaseDiagram = (props) => (
  <div className='tile is-ancestor is-full-height'>
    <Toolbox />
    <Canvas {...props} />
  </div>
);

const mapStateToProps = ({ useCaseDiagram }, ownProps) => ({
  components: useCaseDiagram.components
});

const mapDispatchToProps = dispatch => ({
  onMove: (id, x, y, componentType) => {
    dispatch(umlComponentMove(id, x, y, componentType));
  },
  deleteComponent: (id, componentType) => {
    dispatch(umlComponentDelete(id, componentType));
  },
  onNameChange: (id, name) => {
    dispatch(umlComponentNameChange(id, name));
  },
  umlComponentLink: (id, componentType) => {
    dispatch(umlComponentLink(id, componentType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram);
