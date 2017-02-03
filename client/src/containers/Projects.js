import React from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/navbar';

const Projects = ({ user }) => (
  <NavBar title='Projects' user={user} />
);

const mapStateToProps = ({ projects, login }) => ({
  projects,
  user: login.user.profile
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Projects);
