import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import BaseUML from './BaseUML';
import ActorSVG from './ActorSVG';

class ActorItem extends Component {
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

  enterEdit() {
    this.setState({ isEditing: true });
  }

  leaveEdit() {
    this.setState({ isEditing: false });
  }

  umlComponentLink() {
    this.props.umlComponentLink(_.pick(this.props, 'id', 'type', 'name', 'x', 'y'));
  }

  render() {
    const { id, name, onNameChange } = this.props;
    const fontSize = 10;
    const nameWidth = fontSize * name.length;
    const actorWidth = 20;
    const width = Math.max(actorWidth, nameWidth);
    const height = 70;

    const style = {
      background: 'cornsilk',
      borderRadius: '100%'
    };
    const inputStyle = {
      display: 'block',
      height: fontSize + 5,
      marginTop: -12,
      width
    };
    const paragraphStyle = {
      marginTop: -15,
      textAlign: 'center',
      width
    };

    const renderInput = () => (
      <textarea ref='nameInput' value={name} onBlur={this.leaveEdit.bind(this)}
        onChange={({ target }) => onNameChange(id, target.value) } style={inputStyle} />
    );
    const renderParagraph = () => <p style={paragraphStyle}>{ name }</p>

    return (
      <BaseUML { ...this.props } width={width} height={height}>
        <div onDoubleClick={this.enterEdit.bind(this)} style={style} onClick={this.umlComponentLink.bind(this)}>
          <ActorSVG width={width} height={height} cursor='pointer' />
          { this.state.isEditing && renderInput() }
          { !this.state.isEditing && renderParagraph() }
        </div>
      </BaseUML>
    );
  }
}

export default ActorItem;
