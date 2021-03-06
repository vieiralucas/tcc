import React, { Component } from 'react';

class CreateActorModal extends Component {
  componentDidMount() {
    this.nameInput.focus();
  }

  submitForm(event) {
    event.preventDefault();

    const name = this.nameInput.value;
    const description = this.descriptionInput.value;

    this.props.create({ name, description });
    this.props.close();
  }

  render() {
    const { close } = this.props;

    return (
      <div className='modal is-active'>
        <form onSubmit={this.submitForm.bind(this)} ref={form => { this.form = form }}>
          <div className='modal-background' onClick={close}></div>
          <div className='modal-card'>
            <header className='modal-card-head'>
              <p className='modal-card-title'>Creating a actor</p>
              <button className='delete' onClick={close}></button>
            </header>
            <section className='modal-card-body'>
              <label className='label'>Name</label>
              <p className='control'>
                <input className='input' ref={nameInput => { this.nameInput = nameInput }}
                  type='text' placeholder='Actor name' required={true} />
              </p>
              <label className='label'>Description</label>
              <p className='control'>
                <textarea className='textarea' placeholder='Actor Description'
                  ref={descriptionInput => { this.descriptionInput = descriptionInput }}>
                </textarea>
              </p>
            </section>
            <footer className='modal-card-foot'>
              <button type='submit' className='button is-success'>Save changes</button>
              <button type='button' className='button' onClick={close}>Cancel</button>
            </footer>
          </div>
        </form>
      </div>
    );
  }
}

export default CreateActorModal;
