import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routerActions } from 'react-router-redux'
import { loginUser } from '../actions/login';

class Login extends Component {
  componentWillMount() {
    const { isAuthenticated, replace, redirect } = this.props
    if (isAuthenticated) {
      replace(redirect)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { isAuthenticated, replace, redirect } = nextProps
    const { isAuthenticated: wasAuthenticated } = this.props

    if (!wasAuthenticated && isAuthenticated) {
      replace(redirect)
    }
  }

  login = (e) => {
    e.preventDefault();
    this.props.login({
      email: this.refs.email.value,
      password: this.refs.password.value
    });
  }

  render() {
    const showErrorMessage = () => (
      <p className='help is-danger'>
        { this.props.err.message }
      </p>
    );

    return (
      <section className='hero is-fullheight is-dark is-bold'>
        <div className='hero-body'>
          <div className='container'>
            <div className='columns is-vcentered'>
              <div className='column is-4 is-offset-4'>
                <h1 className='title'>
                  Login
                </h1>
                <form className='box' onSubmit={this.login}>
                  <label className='label'>Email</label>
                  <p className='control'>
                    <input ref='email' className='input' type='email' placeholder='lucas@example.org' />
                  </p>
                  <label className='label'>Password</label>
                  <p className='control'>
                    <input ref='password' className='input' type='password' placeholder='●●●●●●●' />
                  </p>
                  { this.props.err && showErrorMessage() }
                  <hr />
                  <p className='control'>
                    <button className='button is-primary' type='submit'>Login</button>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };
};

const mapStateToProps = ({ login }, ownProps) => {
  const isAuthenticated = Boolean(login.user && login.user.token) || false;
  const redirect = ownProps.location.query.redirect || '/';
  return {
    isAuthenticated,
    redirect,
    err: login.err
  };
};

const mapDispatchToProps = dispatch => ({
  login: (user, password) => {
    dispatch(loginUser(user, password));
  },
  replace: path => {
    dispatch(routerActions.replace(path));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
