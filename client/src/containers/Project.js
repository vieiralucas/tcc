import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../components/navbar';
import SideBar from '../components/sidebar';

class Project extends Component {
  render() {
    const { user } = this.props;

    return (
      <div>
        <NavBar title='Projects' user={user} />
        <section className='section'>
          <div className='tile is-ancestor'>
            <div className='tile is-vertical is-2'>
              <SideBar />
            </div>
            <div className='tile is-vertical is-10'>
              { this.props.children }
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = ({ login }) => ({
  user: login.user
});

const mapDispatchToProps = dispatch => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(Project);
