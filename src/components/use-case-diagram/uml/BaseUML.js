import React from 'react';
import { DragSource } from 'react-dnd';

const umlComponentSource = {
  beginDrag(props) {
    const { id, x, y, type } = props;
    return { id, x, y, type };
  }
};

const BaseUML = props => {
  const style = {
    position: 'absolute',
    left: props.x - props.width / 2,
    top: props.y - props.height / 2,
    zIndex: 1
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

export default DragSource('UML_COMPONENTS', umlComponentSource, collect)(BaseUML);
