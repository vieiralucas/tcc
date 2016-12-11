import React, { Component } from 'react';
import { connect } from 'react-redux';
import Canvas from '../components/Canvas';
import { UML_COMPONENT_MOVE } from '../actions';

class UseCaseDiagram extends Component {
  render() {
    return (
      <Canvas widht={ '100%' } height={ window.innerHeight } components={ this.props.diagramComponents } onComponentMove={ this.props.onComponentMove }/>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  diagramComponents: state.useCaseDiagram
});

const mapDispatchToProps = dispatch => ({
  onComponentMove: (id, x, y) => {
    dispatch({
      type: UML_COMPONENT_MOVE,
      id, x, y
    })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UseCaseDiagram)
