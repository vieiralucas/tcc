// @flow

import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { umlComponentMove } from '../actions';

type UseCaseDiagramProps = {
  components: Array<any>;
  onMove: (id: number, x: number, y: number) => void;
};

const UseCaseDiagram = (props: UseCaseDiagramProps) => (
  <Canvas width={window.innerWidth} height={window.innerHeight}
    components={props.components} onMove={props.onMove} />
);

const mapStateToProps = ({ useCaseDiagram }, ownProps) => ({
  components: useCaseDiagram.components
});

const mapDispatchToProps = dispatch => ({
  onMove: (id, x, y) => {
    dispatch(umlComponentMove(id, x, y));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram);
