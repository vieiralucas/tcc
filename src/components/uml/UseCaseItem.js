import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import BaseUML from './BaseUML';

class UseCaseItem extends Component {
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

  render() {
    const { id, name, onNameChange } = this.props;
    const fontSize = 10;
    const width = 200;
    const height = 70;

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
      minHeight: 35,
      maxHeight: height,
      background: 'white'
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
      <BaseUML { ...this.props } width={width} height={height}>
        <div style={style} onDoubleClick={this.enterEdit.bind(this)}>
          { this.state.isEditing && renderInput() }
          { !this.state.isEditing && renderParagraph() }
        </div>
      </BaseUML>
    );
  }
};

export default UseCaseItem;
