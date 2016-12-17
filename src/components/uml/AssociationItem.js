import React, { Component } from 'react';

class AssociationItem extends Component {
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
      this.props.deleteComponent(this.props.id, this.props.type);
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

export default AssociationItem;
