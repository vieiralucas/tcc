import React from 'react';

const styleDescription = {
  height: 40,
  lineHeight: '20px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
};

const ProjectItem = ({ project, onClick }) => (
  <div className='box project-item' onClick={onClick}>
    <p className='title is-3'>
      {project.name}
    </p>
    <p className='subtitle' style={styleDescription}>
      {project.description}
    </p>
  </div>
);

export default ProjectItem;
