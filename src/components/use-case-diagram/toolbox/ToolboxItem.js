import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';

const toolboxItemSource = {
  beginDrag(props, monitor, component) {
    return {
      from: 'toolbox',
      type: props.type,
      bounding: findDOMNode(component).getBoundingClientRect()
    };
  }
};

class ToolboxItem extends Component {
  render() {
    const props = this.props;
    const previewStyle = {
      display: props.isDragging ? 'none' : ''
    };

    let className = 'button tile is-child box';

    if (props.isSelected) {
      className += ' is-active';
    }

    return props.connectDragSource(
      <button className={className} onMouseDown={() => props.onClick(props.type)}>
        { props.connectDragPreview(<div style={previewStyle}>{ props.children }</div>) }
        <h1 className='title'>{ props.title }</h1>
      </button>
    );
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()

});

export default DragSource('UML_COMPONENTS', toolboxItemSource, collect)(ToolboxItem);
