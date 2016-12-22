import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { DragSource } from 'react-dnd';
import _ from 'lodash';

const umlComponentSource = {
  beginDrag(props) {
    const { id, x, y, type } = props;
    return { id, x, y, type };
  }
};

class BaseUML extends Component {
  getBound() {
    const bound = findDOMNode(this.bound).getBoundingClientRect();
    return _.pick(bound, 'width', 'height');
  }

  componentDidUpdate(prevProps) {
    const newBound = this.getBound();

    if (!_.isEqual(prevProps.bound, newBound)) {
      this.props.boundUpdate(this.props.id, newBound);
    }
  }

  componentDidMount() {
    this.props.boundUpdate(this.props.id, this.getBound());
  }

  render() {
    const style = {
      position: 'absolute',
      left: this.props.x - this.props.width / 2,
      top: this.props.y - ((this.props.bound || {}).height || 0) / 2,
      zIndex: 1
    };

    return this.props.connectDragSource(
      <div ref={bound => this.bound = bound} style={style}>
        { this.props.children }
      </div>
    );
  }
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

export default DragSource('UML_COMPONENTS', umlComponentSource, collect)(BaseUML);
