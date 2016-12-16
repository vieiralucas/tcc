// @flow

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import type { AssociationItemProps } from '../../types';


class AssociationItem extends Component {
  state: {
    isEditing: boolean;
  };

  constructor(props: AssociationItemProps) {
    super(props);
  }

  componentDidUpdate() {
    if (this.state.isEditing) {
      ReactDOM.findDOMNode(this.refs.nameInput).focus();
    }
  }

  render() {
    const { name, x1, x2, y1, y2 } = this.props;

    const d = `M ${x1} ${y1} L ${x2} ${y2}`;
    return (
      <svg>
        <path d={d} strokeWidth='1' stroke='black' />
      </svg>
    );
  }
}

export default AssociationItem;
