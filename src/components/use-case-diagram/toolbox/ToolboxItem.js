import React from 'react';

const ToolboxItem = props => {
  let className = 'button tile is-child box';

  if (props.isSelected) {
    className += ' is-active';
  }

  return (
    <button className={className} onClick={() => props.onClick(props.type)}>
      { props.children }
      <h1 className='title'>{ props.title }</h1>
    </button>
  );
};

export default ToolboxItem;
