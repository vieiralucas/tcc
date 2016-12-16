// @flow

import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { umlComponentMove, umlComponentNameChange } from '../actions';
import type { UMLComponents } from '../types';

type UseCaseDiagramProps = {
  components: UMLComponents;
  onMove: (id: number, x: number, y: number, componentType: string) => void;
  onNameChange: (id: number, name: string) => void;
};

const UseCaseDiagram = (props: UseCaseDiagramProps) => (
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
