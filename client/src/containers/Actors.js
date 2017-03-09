import React, { Component } from 'react';
import { connect } from 'react-redux';

import ActorsList from '../components/actors/ActorsList';
import CreateActorModal from '../components/actors/CreateActorModal';
import UpdateActorModal from '../components/actors/UpdateActorModal';
import ConfirmModal from '../components/ConfirmModal';

import * as actions from '../actions/actors';

class Actors extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingActor: false
    };
  }

  componentWillMount() {
    this.props.fetchActors(this.props.projectId);
  }

  openCreateActorModal() {
    this.setState({
      creatingActor: true
    });
  }

  closeCreateActorModal() {
    this.setState({
      creatingActor: false
    });
  }

  createActor(actor) {
    actor.project = this.props.projectId;
    this.props.createActor(actor, this.props.user);
  }

  openUpdateActorModal(actor) {
    this.setState({
      updatingActor: actor
    });
  }

  closeUpdateActorModal() {
    this.setState({
      updatingActor: null
    });
  }

  updateActor(actor) {
    this.props.updateActor(actor);
    this.setState({
      updatingActor: null
    });
  }

  openRemoveActorModal(actor) {
    this.setState({
      removingActor: actor
    });
  }

  closeRemoveActorModal() {
    this.setState({
      removingActor: null
    });
  }

  removeActor(actor) {
    this.props.removeActor(this.state.removingActor);
    this.setState({
      removingActor: null
    });
  }

  render() {
    return (
      <div>
        <section className='section'>
          <ActorsList actors={this.props.actors.list}
            update={this.openUpdateActorModal.bind(this)}
            remove={this.openRemoveActorModal.bind(this)} />
        </section>
        <section className='section'>
          <button className='button is-primary' onClick={this.openCreateActorModal.bind(this)}>
            Create Actor
          </button>
        </section>
        {
          this.state.creatingActor &&
          <CreateActorModal close={this.closeCreateActorModal.bind(this)}
            create={this.createActor.bind(this)} />
        }
        {
          this.state.updatingActor &&
          <UpdateActorModal close={this.closeUpdateActorModal.bind(this)}
            update={this.updateActor.bind(this)} actor={this.state.updatingActor} />
        }
        {
          this.state.removingActor &&
          <ConfirmModal close={this.closeRemoveActorModal.bind(this)}
            confirm={this.removeActor.bind(this)}
            message={`Are you sure that you want to remove actor ${this.state.removingActor.name}?`} />
        }
      </div>
    );
  };
}

const mapStateToProps = ({ actors }, { params }) => ({
  actors: actors,
  projectId: params.projectId
});

const mapDispatchToProps = dispatch => ({
  fetchActors: projectId => {
    dispatch(actions.fetchActors(projectId));
  },
  createActor: actor => {
    dispatch(actions.createActor(actor));
  },
  updateActor: actor => {
    dispatch(actions.updateActor(actor));
  },
  removeActor: actor => {
    dispatch(actions.removeActor(actor));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Actors);
