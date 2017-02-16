import React from 'react';

import ProjectItem from './ProjectItem';
import CreateProjectButton from './CreateProjectButton';

const ProjectsList = ({ projects, openCreateProjectModal }) => {
  return (
    <div className='columns is-multiline'>
      { projects.map(p => (
          <div key={p._id} className='column is-one-quarter'>
            <ProjectItem project={p} />
          </div>
        ))
      }
      <div className='column is-one-quarter'>
        <CreateProjectButton onClick={openCreateProjectModal}/>
      </div>
    </div>
  );
};

export default ProjectsList
