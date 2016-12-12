// @flow

import React from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { umlComponentMove, umlComponentSelected, umlComponentUnselected } from '../actions';

type UseCaseDiagramProps = {
  components: Array<any>;
  selected: number;
  onComponentMove: (id: number, x: number, y: number) => void;
  onComponentSelected: (id: number) => void;
  onComponentUnselected: (id: number) => void;
};

const UseCaseDiagram = (props: UseCaseDiagramProps) => (
  <Canvas width={window.innerWidth} height={window.innerHeight}
    components={props.components} onComponentMove={props.onComponentMove}
    onComponentSelected={props.onComponentSelected}
    onComponentUnselected={props.onComponentUnselected}
    selected={props.selected} />
);

const mapStateToProps = ({useCaseDiagram}, ownProps) => ({
  components: useCaseDiagram.components,
  selected: useCaseDiagram.selectedId
});

const mapDispatchToProps = dispatch => ({
  onComponentMove: (id, x, y) => {
    dispatch(umlComponentMove(id, x, y));
  },
  onComponentSelected: id => {
    dispatch(umlComponentSelected(id));
  },
  onComponentUnselected: id => {
    dispatch(umlComponentUnselected(id));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram);
