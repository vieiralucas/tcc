import React from 'react';
import ActorSVG from './uml/ActorSVG';

const Toolbox = () => (
  <div className='tile is-parent is-vertical is-2'>
    <div className='tile is-child is-primary box'>
      <ActorSVG />
    </div>
    <div className='tile is-child is-primary box'>
      UseCase
    </div>
  </div>
);

export default Toolbox;
