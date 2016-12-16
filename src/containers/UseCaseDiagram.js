import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { umlComponentMove, umlComponentNameChange } from '../actions';

const UseCaseDiagram = (props) => (
  <Canvas width={window.innerWidth} height={window.innerHeight} {...props} />
);

const mapStateToProps = ({ useCaseDiagram }, ownProps) => ({
  components: useCaseDiagram.components
});

const mapDispatchToProps = dispatch => ({
  onMove: (id, x, y, componentType) => {
    dispatch(umlComponentMove(id, x, y, componentType));
  },
  onNameChange: (id, name) => {
    dispatch(umlComponentNameChange(id, name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram);
