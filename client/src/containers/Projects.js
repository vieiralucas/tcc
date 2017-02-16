import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/projects';

import NavBar from '../components/navbar';
import Loading from '../components/Loading';
import ProjectsList from '../components/projects/ProjectsList';
import CreateProjectModal from '../components/projects/CreateProjectModal';

class Projects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      creatingProject: false
    };
  }

  componentWillMount() {
    this.props.fetchProjects(this.props.user);
  }

  openCreateProjectModal() {
    this.setState({
      creatingProject: true
    });
  }

  closeCreateProjectModal() {
    this.setState({
      creatingProject: false
    });
  }

  createProject(project) {
    this.props.createProject(project, this.props.user);
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
        <ProjectsList
          projects={projects.list}
          openCreateProjectModal={this.openCreateProjectModal.bind(this)} />
      );
    };

    return (
      <div>
        <NavBar title='Projects' user={user} />
        <section className='section'>
          { renderProjects() }
        </section>
        {
          this.state.creatingProject &&
          <CreateProjectModal close={this.closeCreateProjectModal.bind(this)}
            create={this.createProject.bind(this)} />
        }
      </div>
    );
  }
}

const mapStateToProps = ({ projects, login }) => ({
  projects,
  user: login.user
});

const mapDispatchToProps = dispatch => ({
  fetchProjects: user => {
    dispatch(actions.fetchProjectsByUser(user));
  },
  createProject: (project, user) => {
    dispatch(actions.createProject(project, user));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
