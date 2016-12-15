// @flow

import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { umlComponentMove, umlComponentNameChange } from '../actions';

type UseCaseDiagramProps = {
  components: Array<any>;
  onMove: (id: number, x: number, y: number) => void;
  onNameChange: (id: number, name: string) => void;
};

const UseCaseDiagram = (props: UseCaseDiagramProps) => (
  <Canvas width={window.innerWidth} height={window.innerHeight} {...props} />
);

const mapStateToProps = ({ useCaseDiagram }, ownProps) => ({
  components: useCaseDiagram.components
});

const mapDispatchToProps = dispatch => ({
  onMove: (id, x, y) => {
    dispatch(umlComponentMove(id, x, y));
  },
  onNameChange: (id, name) => {
    console.log(id, name);
    dispatch(umlComponentNameChange(id, name));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram);
