import React from 'react';

import { RelativeLink } from 'react-router-relative-links';

const Sidebar = () => (
  <aside className='menu'>
    <ul className='menu-list'>
      <li><RelativeLink to='./kanban'>Kanban</RelativeLink></li>
      <li><RelativeLink to='./usecases'>Use Cases</RelativeLink></li>
      <li><RelativeLink to='./actors'>Actors</RelativeLink></li>
      <li><RelativeLink to='./histories'>Histories</RelativeLink></li>
      <li><RelativeLink to='./usecasediagram'>Use Case Diagram</RelativeLink></li>
      <li><RelativeLink to='./slices'>Slices</RelativeLink></li>
    </ul>
  </aside>
);

export default Sidebar;
