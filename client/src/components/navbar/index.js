import React from 'react';

const NavBar = ({user, title}) => (
  <nav className="nav has-shadow">
    <div className="container">
      <div className="nav-left">
        <a className="nav-item">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" />
        </a>
      </div>
      <div className="nav-center">
        <h1 className="nav-item">{title}</h1>
      </div>
      <div className="nav-right nav-menu">
        <a className="nav-item is-tab">Edit profile</a>
        <a className="nav-item is-tab">Log out</a>
      </div>
    </div>
  </nav>
);

export default NavBar;

