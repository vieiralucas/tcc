import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class AssociationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  componentDidUpdate() {
    if (this.state.isEditing) {
      ReactDOM.findDOMNode(this.refs.nameInput).focus();
    }
  }

  render() {
    const actorCord = this.props.actorCord;
    const useCaseCord = this.props.useCaseCord;

    const d = `M ${actorCord.x} ${actorCord.y} L ${useCaseCord.x} ${useCaseCord.y}`;
    const style = {
      width: '100%',
      height: '100%'
    };

    return (
      <svg style={style}>
        <path d={d} strokeWidth='1' stroke='black' />
      </svg>
    );
  }
}

export default AssociationItem;
