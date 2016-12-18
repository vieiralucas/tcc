import React from 'react';
import ActorSVG from './uml/ActorSVG';
import ToolboxItem from './toolbox/ToolboxItem';

const Toolbox = props => {
  const isSelected = type => props.toolbox.selected === type;

  const style = {
    fontSize: 10,
    border: 'solid',
    borderWidth: '1px',
    borderRadius: '100%',
    textAlign: 'center',
    width: 200,
    height: 35,
    margin: 'auto'
  };

  return (
    <div className='container toolbox is-fluid tile is-parent is-vertical is-2'>
      <ToolboxItem title='Actor' type='actor' onClick={props.onClick}
        isSelected={isSelected('actor')}>
        <ActorSVG />
      </ToolboxItem>
      <ToolboxItem title='Use Case' type='use-case' onClick={props.onClick}
        isSelected={isSelected('use-case')}>
        <div style={style}>
          <p>Use Case Name</p>
        </div>
      </ToolboxItem>
    </div>
  );
};

export default Toolbox;
