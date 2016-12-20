import React, { Component } from 'react';

class UseCaseAssociationItem extends Component {
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

  toggleType = () => {
    this.props.toggleUseCaseAssociationType(this.props.id);
  }

  render() {
    const useCase1 = this.props.useCase1;
    const useCase2 = this.props.useCase2;

    const d = `M ${useCase1.x} ${useCase1.y} L ${useCase2.x} ${useCase2.y}`;

    const strokeColor = this.state.isSelected ? 'red' : 'black';
    const center = {
      x: (useCase1.x + useCase2.x) / 2,
      y: (useCase1.y + useCase2.y) / 2
    };

    const distance = () => Math.round(
      Math.sqrt(
        Math.pow(useCase1.x - useCase2.x, 2) +
        Math.pow(useCase1.y - useCase2.y, 2)
      )
    );

    const style = {
      position: 'absolute',
      width: '100%',
      height: '100%'
    };
    const pathStyle = {
      cursor: 'pointer',
      outline: 'none'
    };
    const textStyle = {
      cursor: 'pointer'
    };

    return (
      <svg style={style} onKeyDown={this.onKeyDown.bind(this)}>
        { this.props.associationType === 'INCLUDES' ?
          <text textAnchor='middle' x={center.x} y={center.y - 10} width={distance()} onDoubleClick={this.toggleType} style={textStyle}>{ '<<includes>>' }</text> :
          <text textAnchor='middle' x={center.x} y={center.y} width={distance()} onDoubleClick={this.toggleType} style={textStyle}>{ '<<extends>>' }</text>
        }
        <path strokeDasharray='5, 5' tabIndex='0' d={d} strokeWidth='1' stroke={strokeColor}
          onClick={this.select.bind(this)} onBlur={this.unselect.bind(this)}
          style={pathStyle} />
      </svg>
    );
  }
}

export default UseCaseAssociationItem;
