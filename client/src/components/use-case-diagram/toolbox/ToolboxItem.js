import React, { Component } from 'react';

class SelectItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.items[0] || null
    };
  };

  submitForm(event) {
    event.preventDefault();

    this.props.select(this.state.selected);
    this.props.close();
  }

  handleChange(event) {
    const { items } = this.props;
    const selected = items.find(i => i._id === event.target.value);

    this.setState({
      selected
    });
  }

  render() {
    const { close, type, items } = this.props;

    return (
      <div className='modal is-active'>
        <form onSubmit={this.submitForm.bind(this)}>
          <div className='modal-background' onClick={close}></div>
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>Pick an { type }</p>
              <button className='delete' onClick={close}></button>
            </header>
            <section className='modal-card-body'>
              <div className='field'>
                <p className='control'>
                  <span className='select'>
                    <select onChange={this.handleChange.bind(this)}>
                      { items.map(i => 
                          <option key={i._id} value={i._id}>{i.name}</option>
                        )
                      }
                    </select>
                  </span>
                </p>
              </div>
            </section>
            <footer className='modal-card-foot'>
              <button type='submit' className='button is-success'>Pick</button>
              <button type='button' className='button' onClick={close}>Cancel</button>
            </footer>
          </div>
        </form>
      </div>
    );
  }
}

class ToolboxItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelecting: false
    };
  }

  startSelection() {
    this.setState({
      isSelecting: true
    });
  }

  closeSelection() {
    this.setState({
      isSelecting: false
    });
  }

  selectedItem(item) {
    this.props.addComponent(this.props.type, item);
  }

  render() {
    const props = this.props;
    const previewStyle = {
      display: props.isDragging ? 'none' : ''
    };

    return (
      <div className='tile is-child box'>
        <a className='button tile is-child box' onClick={this.startSelection.bind(this)}>
          <div style={previewStyle}>{ props.children }</div>
          <h1 className='title'>{ props.title }</h1>
        </a>
        { this.state.isSelecting &&
          <SelectItemModal type={props.type} items={props.items}
            select={this.selectedItem.bind(this)}
            close={this.closeSelection.bind(this)}/> 
        }
      </div>
    );
  }
}

export default ToolboxItem;
