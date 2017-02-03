import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import Projects from './containers/Projects'
import Login from './containers/Login'
import Loading from './components/Loading';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.login.user, // how to get the user state
	authenticatingSelector: state => state.login.isLoading,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
	LoadingComponent: Loading,
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

export default (
	<Route path='/'>
		<IndexRoute component={UserIsAuthenticated(Projects)} />
		<Route path='login' component={Login} />
	</Route>
);
