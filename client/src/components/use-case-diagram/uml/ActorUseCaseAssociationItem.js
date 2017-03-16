import React, { Component } from 'react';

class ActorUseCaseAssociationItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false
    };
  }

  select() {
    this.setState({
      isSelected: true
    });
  }

  unselect() {
    this.setState({
      isSelected: false
    });
  }

  onKeyDown({ keyCode }) {
    console.log(keyCode);
    if (!this.state.isSelected) {
      return;
    }

    if (keyCode === 8) {
      this.props.deleteComponent(this.props._id, this.props.type);
    }
  }

  render() {
    const actor = this.props.actor;
    const useCase = this.props.useCase;

    const d = `M ${actor.x} ${actor.y} L ${useCase.x} ${useCase.y}`;
    const style = {
      position: 'absolute',
      width: '100%',
      height: '100%'
    };
    const strokeColor = this.state.isSelected ? 'red' : 'black';
    const pathStyle = {
      cursor: 'pointer',
      outline: 'none'
    };

    return (
      <svg style={style} onKeyDown={this.onKeyDown.bind(this)}>
        <path tabIndex='0' d={d} strokeWidth='1' stroke={strokeColor}
          onClick={this.select.bind(this)} onBlur={this.unselect.bind(this)}
          style={pathStyle} />
      </svg>
    );
  }
}

export default ActorUseCaseAssociationItem;
