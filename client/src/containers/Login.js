import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Login extends Component {
	login = (e) => {
		e.preventDefault();
		this.props.login({
			email: this.refs.email,
			password: this.refs.password
		});
	}

	render() {
		return (
			<section className='hero is-fullheight is-dark is-bold'>
				<div className='hero-body'>
					<div className='container'>
						<div className='columns is-vcentered'>
							<div className='column is-4 is-offset-4'>
								<h1 className='title'>
									Login
								</h1>
								<div className='box'>
									<label className='label'>Email</label>
									<p className='control'>
										<input ref='email' className='input' type='email' placeholder='lucas@example.org' />
									</p>
									<label className='label'>Password</label>
									<p className='control'>
										<input ref='password' className='input' type='password' placeholder='●●●●●●●' />
									</p>
									<hr />
									<p className='control'>
										<button className='button is-primary' onClick={this.login}>Login</button>
									</p>
								</div>
								<p className='has-text-centered'>
									<a>Register an Account</a>
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	};
};

const mapDispatchToProps = dispatch => ({
	login: (user, password) => {
		dispatch(actions.userLogin(user, password));
	}
});

export default connect(
  false,
  mapDispatchToProps
)(Login);
