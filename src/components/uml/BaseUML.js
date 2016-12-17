import React from 'react';
import { DragSource } from 'react-dnd';

const boxSource = {
  beginDrag(props) {
    const { id, x, y } = props;
    return { id, x, y };
  }
};

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

  return props.connectDragSource(
    <div style={style}>
      { props.children }
    </div>
  );
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource('UML_COMPONENTS', boxSource, collect)(BaseUML);
