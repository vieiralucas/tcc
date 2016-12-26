import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { routerActions } from 'react-router-redux';
import { UserAuthWrapper } from 'redux-auth-wrapper';

import UseCaseDiagram from './containers/UseCaseDiagram'
import Login from './containers/Login'
import Loading from './components/Loading';

// Redirects to /login by default
const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user.data, // how to get the user state
	authenticatingSelector: state => state.user.isLoading,
  redirectAction: routerActions.replace, // the redux action to dispatch for redirect
	LoadingComponent: Loading,
  wrapperDisplayName: 'UserIsAuthenticated' // a nice name for this auth check
});

export default (
	<Route path='/'>
		<IndexRoute component={UserIsAuthenticated(UseCaseDiagram)} />
		<Route path='login' component={Login} />
	</Route>
);
