import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import applyMiddleware from 'react-router-apply-middleware'
import { useRelativeLinks } from 'react-router-relative-links'

import routes from '../routes'

const Root ({ store, history }) => {
  <Provider store={store}>
    <Router history={history} routes={routes} render={applyMiddleware(useRelativeLinks())}/>
  </Provider>
);

export default Root;
