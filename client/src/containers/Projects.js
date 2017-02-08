import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/projects';

import NavBar from '../components/navbar';
import Loading from '../components/Loading';
import ProjectItem from '../components/projects/ProjectItem';

class Projects extends Component {
  componentDidMount() {
    this.props.fetchProjects(this.props.user);
  }

  render() {
    const { user, projects } = this.props;

    const renderProjects = () => {
      if (projects.loading) {
        return <Loading />;
      }

      if (projects.error) {
        return <p> Unexpected error. </p>;
      }

      return (
        <ul>
          { projects.list.map(p => <ProjectItem project={p} />) }
        </ul>
      );
    };

    return (
      <div>
        <NavBar title='Projects' user={user} />
        { renderProjects() }
      </div>
    );
  }
}

const mapStateToProps = ({ projects, login }) => ({
  projects,
  user: login.user.profile
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: user => {
    dispatch(actions.fetchProjectsByUser(user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
