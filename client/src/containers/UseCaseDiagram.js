import React, { Component } from 'react';
import { connect } from 'react-redux';

import Canvas from '../components/use-case-diagram/Canvas';
import Toolbox from '../components/use-case-diagram/Toolbox';
import * as diagramActions from '../actions/use-case-diagram';
import * as actorsActions from '../actions/actors';
import * as usecasesActions from '../actions/usecases';

class UsecaseDiagram extends Component {
  componentWillMount() {
    this.props.fetchItems(this.props.projectId);
  }

  render() {
    const props = this.props;
    const availableActors = props.actors
      .filter(u => !props.components.actors.find(c => c._id === u._id));
    const availableUsecases = props.usecases
      .filter(u => !props.components.useCases.find(c => c._id === u._id));

    return (
      <div className='tile is-ancestor is-full-height'>
        <Toolbox onClick={props.toolboxSelection} toolbox={props.toolbox}
          actors={availableActors} usecases={availableUsecases}
          addComponent={props.addComponent} />
        <Canvas onMove={props.onMove} deleteComponent={props.deleteComponent}
          onNameChange={props.onNameChange}
          umlComponentLink={props.umlComponentLink}
          toggleUseCaseAssociationType={props.toggleUseCaseAssociationType}
          boundUpdate={props.boundUpdate} components={props.components} />
      </div>
    );
  }
}

const mapStateToProps = ({ useCaseDiagram, user, actors, usecases }, ownProps) => ({
  components: useCaseDiagram.components,
  toolbox: useCaseDiagram.toolbox,
  projectId: ownProps.params.projectId,
  user,
  actors: actors.list,
  usecases: usecases.list
});

const mapDispatchToProps = dispatch => ({
  onMove: (_id, x, y, componentType) => {
    dispatch(diagramActions.umlComponentMove(_id, x, y, componentType));
  },
  deleteComponent: (_id, componentType) => {
    dispatch(diagramActions.umlComponentDelete(_id, componentType));
  },
  onNameChange: (id, name) => {
    dispatch(diagramActions.umlComponentNameChange(id, name));
  },
  umlComponentLink: (_id, componentType) => {
    dispatch(diagramActions.umlComponentLink(_id, componentType));
  },
  boundUpdate: (_id, bound) => {
    dispatch(diagramActions.umlComponentBoundUpdate(_id, bound));
  },
  toolboxSelection: type => {
    dispatch(diagramActions.toolboxSelection(type));
  },
  addComponent: (type, component) => {
    dispatch(diagramActions.addComponent(type, component));
  },
  toggleUseCaseAssociationType: _id => {
    dispatch(diagramActions.toggleUseCaseAssociationType(_id));
  },
  fetchItems: projectId => {
    dispatch(actorsActions.fetchActors(projectId));
    dispatch(usecasesActions.fetchUsecases(projectId));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsecaseDiagram);
