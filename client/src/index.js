// @flow

import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import Root from './containers/Root';
import configureStore from './store/configureStore';
import api from './api';

import 'bulma/css/bulma.css';
import 'font-awesome/css/font-awesome.css'
import './index.css';

const store = configureStore();
api.setStore(store);
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Root className='container' store={store} history={history} />,
  document.getElementById('root')
);
