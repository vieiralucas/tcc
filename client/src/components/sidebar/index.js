import React from 'react';

import { RelativeLink } from 'react-router-relative-links';

const Sidebar = () => (
  <aside className='menu'>
    <ul className='menu-list'>
      <li><RelativeLink activeClassName='is-active' to='./kanban'>Kanban</RelativeLink></li>
      <li><RelativeLink activeClassName='is-active' to='./usecases'>Use Cases</RelativeLink></li>
      <li><RelativeLink activeClassName='is-active' to='./actors'>Actors</RelativeLink></li>
      <li><RelativeLink activeClassName='is-active' to='./histories'>Histories</RelativeLink></li>
      <li><RelativeLink activeClassName='is-active' to='./usecasediagram'>Use Case Diagram</RelativeLink></li>
      <li><RelativeLink activeClassName='is-active' to='./slices'>Slices</RelativeLink></li>
    </ul>
  </aside>
);

export default Sidebar;
