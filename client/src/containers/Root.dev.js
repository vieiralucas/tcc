import React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import applyMiddleware from 'react-router-apply-middleware'
import { useRelativeLinks } from 'react-router-relative-links'

import routes from '../routes'
import DevTools from './DevTools'

const Root = ({ store, history }) => (
  <Provider store={store}>
    <div>
      <Router history={history} routes={routes} render={applyMiddleware(useRelativeLinks())}/>
      <DevTools />
    </div>
  </Provider>
);

export default Root;
