import React from 'react';
import Draggable from 'react-draggable';

const BaseUML = props => {
  const handleDrag = (e, data) => {
    const { id, x, y } = props;

    props.onMove(id, x + data.deltaX, y + data.deltaY, props.type);
  };

  const style = {
    position: 'absolute',
    left: props.x,
    top: props.y
  };

  return (
    <Draggable onDrag={handleDrag}>
      <div style={style}>
        { props.children }
      </div>
    </Draggable>
  );
};

export default BaseUML;
