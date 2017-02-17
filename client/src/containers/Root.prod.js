import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import applyMiddleware from 'react-router-apply-middleware'
import { useRelativeLinks } from 'react-router-relative-links'

import routes from '../routes'


class Root extends Component {
  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <Router history={history} routes={routes} render={applyMiddleware(useRelativeLinks())}/>
      </Provider>
    );
  }
}

export default DragDropContext(HTML5Backend)(Root);
