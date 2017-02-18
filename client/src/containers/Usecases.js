import React, { Component } from 'react';
import { connect } from 'react-redux';

import UsecasesList from '../components/usecases/UsecasesList';

import * as actions from '../actions/usecases';

class Usecases extends Component {
  componentWillMount() {
    this.props.fetchUsecases(this.props.projectId);
  }

  render() {
    return <UsecasesList usecases={this.props.usecases.list} />
  };
}

const mapStateToProps = ({ usecases }, { params }) => ({
  usecases: usecases,
  projectId: params.projectId
});

const mapDispatchToProps = dispatch => ({
  fetchUsecases: projectId => {
    dispatch(actions.fetchUsecases(projectId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Usecases);
