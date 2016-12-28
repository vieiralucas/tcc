import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import BaseUML from './BaseUML';
import _ from 'lodash';

class UseCaseItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false
    };
  }

  componentDidUpdate(prevProps) {
    if (this.state.isEditing) {
      findDOMNode(this.refs.nameInput).focus();
    }
  }

  enterEdit() {
    this.setState({ isEditing: true });
  }

  leaveEdit() {
    this.setState({ isEditing: false });
  }

  umlComponentLink() {
    const useCaseProps = _.pick(this.props, 'id', 'type', 'name', 'x', 'y', 'bound');
    this.props.umlComponentLink(useCaseProps);
  }

  render() {
    const { id, name, onNameChange } = this.props;
    const fontSize = 10;
    const width = 200;

    const style = {
      fontSize: `${fontSize}px`,
      border: 'solid',
      borderWidth: '1px',
      borderRadius: '100%',
      cursor: 'pointer',
      textAlign: 'center',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      width,
      minHeight: 50,
      background: 'cornsilk'
    };
    const inputStyle = {
      margin: '10px'
    };

    const renderInput = () => (
      <textarea ref='nameInput' value={name} onBlur={this.leaveEdit.bind(this)}
        style={inputStyle} onChange={({ target }) => onNameChange(id, target.value) } />
    );
    const renderParagraph = () => <p>{ name }</p>

    return (
      <BaseUML { ...this.props } width={width}>
        <div ref='bound' style={style} onDoubleClick={this.enterEdit.bind(this)} onClick={this.umlComponentLink.bind(this)}>
          { this.state.isEditing && renderInput() }
          { !this.state.isEditing && renderParagraph() }
        </div>
      </BaseUML>
    );
  }
};

export default UseCaseItem;
