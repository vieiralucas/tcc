import React from 'react';
import { Link } from 'react-router';

import ProjectItem from './ProjectItem';
import CreateProjectButton from './CreateProjectButton';

const ProjectsList = ({ projects, openCreateProjectModal }) => {
  return (
    <div className='columns is-multiline'>
      { projects.map(p => (
          <div key={p._id} className='column is-one-quarter'>
            <Link to={`/projects/${p._id}`}>
              <ProjectItem project={p} />
            </Link>
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
