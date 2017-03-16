import React from 'react';
import ActorSVG from './uml/ActorSVG';
import ToolboxItem from './toolbox/ToolboxItem';

const Toolbox = props => {
  const actorStyle = {
    margin: 'auto'
  };
  const useCaseStyle = {
    fontSize: 10,
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '100%',
    textAlign: 'center',
    width: '80%',
    height: 35,
    margin: 'auto',
    marginBottom: 10
  };
  
  const { actors, usecases, addComponent } = props;

  return (
    <div className='container toolbox is-fluid tile is-parent is-vertical is-2'>
      <ToolboxItem title='Actor' type='actor'
        onClick={props.onClick} items={actors} addComponent={addComponent}>
        <ActorSVG width={100} style={actorStyle}/>
      </ToolboxItem>
      <ToolboxItem title='Use Case' type='usecase'
        onClick={props.onClick} items={usecases} addComponent={addComponent}>
        <div style={useCaseStyle}>
          <p>Use Case Name</p>
        </div>
      </ToolboxItem>
    </div>
  );
};

export default Toolbox;
