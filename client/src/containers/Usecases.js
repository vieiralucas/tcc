import React, { Component } from 'react';
import { connect } from 'react-redux';

import UsecasesList from '../components/usecases/UsecasesList';
import CreateUsecaseModal from '../components/usecases/CreateUsecaseModal';
import UpdateUsecaseModal from '../components/usecases/UpdateUsecaseModal';
import ConfirmModal from '../components/ConfirmModal';

import * as actions from '../actions/usecases';

class Usecases extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingUsecase: false
    };
  }

  componentWillMount() {
    this.props.fetchUsecases(this.props.projectId);
  }

  openCreateUsecaseModal() {
    this.setState({
      creatingUsecase: true
    });
  }

  closeCreateUsecaseModal() {
    this.setState({
      creatingUsecase: false
    });
  }

  createUsecase(usecase) {
    usecase.project = this.props.projectId;
    this.props.createUsecase(usecase, this.props.user);
  }

  openUpdateUsecaseModal(usecase) {
    this.setState({
      updatingUsecase: usecase
    });
  }

  closeUpdateUsecaseModal() {
    this.setState({
      updatingUsecase: null
    });
  }

  updateUsecase(usecase) {
    this.props.updateUsecase(usecase);
    this.setState({
      updatingUsecase: null
    });
  }

  openRemoveUsecaseModal(usecase) {
    this.setState({
      removingUsecase: usecase
    });
  }

  closeRemoveUsecaseModal() {
    this.setState({
      removingUsecase: null
    });
  }

  removeUsecase(usecase) {
    this.props.removeUsecase(this.state.removingUsecase);
    this.setState({
      removingUsecase: null
    });
  }

  render() {
    return (
      <div>
        <section className='section'>
          <UsecasesList usecases={this.props.usecases.list}
            update={this.openUpdateUsecaseModal.bind(this)}
            remove={this.openRemoveUsecaseModal.bind(this)} />
        </section>
        <section className='section'>
          <button className='button is-primary' onClick={this.openCreateUsecaseModal.bind(this)}>
            Create Usecase
          </button>
        </section>
        {
          this.state.creatingUsecase &&
          <CreateUsecaseModal close={this.closeCreateUsecaseModal.bind(this)}
            create={this.createUsecase.bind(this)} />
        }
        {
          this.state.updatingUsecase &&
          <UpdateUsecaseModal close={this.closeUpdateUsecaseModal.bind(this)}
            update={this.updateUsecase.bind(this)} usecase={this.state.updatingUsecase} />
        }
        {
          this.state.removingUsecase &&
          <ConfirmModal close={this.closeRemoveUsecaseModal.bind(this)}
            confirm={this.removeUsecase.bind(this)}
            message={`Are you sure that you want to remove usecase ${this.state.removingUsecase.name}?`} />
        }
      </div>
    );
  };
}

const mapStateToProps = ({ usecases }, { params }) => ({
  usecases: usecases,
  projectId: params.projectId
});

const mapDispatchToProps = dispatch => ({
  fetchUsecases: projectId => {
    dispatch(actions.fetchUsecases(projectId));
  },
  createUsecase: usecase => {
    dispatch(actions.createUsecase(usecase));
  },
  updateUsecase: usecase => {
    dispatch(actions.updateUsecase(usecase));
  },
  removeUsecase: usecase => {
    dispatch(actions.removeUsecase(usecase));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Usecases);
