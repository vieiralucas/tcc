import React from 'react';

const CreateProjectButton = ({ onClick }) => (
  <a className='box button control has-addons' onClick={onClick}>
    <span className='icon'>
      <i className='fa fa-plus-circle'></i>
    </span>
    <span>Add project</span>
  </a>
);

export default CreateProjectButton;
