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

    const x = useCase1.x;
    const y = useCase1.y;
    const w = useCase2.bound.width;
    const h = useCase2.bound.height;
    const rx = useCase2.x;
    const ry = useCase2.y;

    const m = ((x - rx) / w) + ((y - ry) / h);
    const n = ((x - rx) / w) - ((y - ry) / h);

    let quadrant = '';
    if (m > 0){
      if (n > 0) {
        quadrant = 'right';
      } else {
        quadrant = 'bottom';
      }
    } else {
      if (n > 0) {
        quadrant = 'top';
      } else {
        quadrant = 'left';
      }
    }

    let contactPoint;
    let arrow;

    switch (quadrant) {
      case 'right':
        contactPoint = { x: useCase2.x + useCase2.bound.width / 2, y: useCase2.y };
	arrow = `M ${contactPoint.x} ${contactPoint.y} L ${contactPoint.x + 10} ${contactPoint.y - 10} M ${contactPoint.x + 10} ${contactPoint.y + 10} L ${contactPoint.x} ${contactPoint.y}`;
        break;
      case 'bottom':
        contactPoint = { x: useCase2.x, y: useCase2.y + useCase2.bound.height / 2 };
	arrow = `M ${contactPoint.x} ${contactPoint.y} L ${contactPoint.x - 10} ${contactPoint.y + 10} M ${contactPoint.x + 10} ${contactPoint.y + 10} L ${contactPoint.x} ${contactPoint.y}`;
        break;
      case 'top':
        contactPoint = { x: useCase2.x, y: useCase2.y - useCase2.bound.height / 2 };
	arrow = `M ${contactPoint.x} ${contactPoint.y} L ${contactPoint.x - 10} ${contactPoint.y - 10} M ${contactPoint.x + 10} ${contactPoint.y - 10} L ${contactPoint.x} ${contactPoint.y}`;
        break;
      default: {
        contactPoint = { x: useCase2.x - useCase2.bound.width / 2, y: useCase2.y };
	arrow = `M ${contactPoint.x} ${contactPoint.y} L ${contactPoint.x - 10} ${contactPoint.y - 10} M ${contactPoint.x - 10} ${contactPoint.y + 10} L ${contactPoint.x} ${contactPoint.y}`;
        break;
      }
    }

    const d = `M ${useCase1.x} ${useCase1.y} L ${Math.round(contactPoint.x)} ${Math.round(contactPoint.y)}`;

    return (
      <svg style={style} onKeyDown={this.onKeyDown.bind(this)}>
        { this.props.associationType === 'INCLUDES' ?
          <text textAnchor='middle' x={center.x} y={center.y - 10} width={distance()} onDoubleClick={this.toggleType} style={textStyle}>{ '<<includes>>' }</text> :
          <text textAnchor='middle' x={center.x} y={center.y} width={distance()} onDoubleClick={this.toggleType} style={textStyle}>{ '<<extends>>' }</text>
        }
        <path strokeDasharray='5, 5' tabIndex='0' d={d} strokeWidth='1' stroke={strokeColor}
          onClick={this.select.bind(this)} onBlur={this.unselect.bind(this)}
          style={pathStyle} />
	<path d={arrow} strokeWidth='1' stroke={strokeColor}
          onClick={this.select.bind(this)} onBlur={this.unselect.bind(this)} />
      </svg>
    );
  }
}

export default UseCaseAssociationItem;
