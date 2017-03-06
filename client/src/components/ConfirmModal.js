import React from 'react';

const ConfirmModal = ({ title, message, close, confirm }) => {
  title = title || 'Cofirmation';
  message = message || 'Are you sure?';

  return (
    <div className='modal is-active'>
      <div className='modal-background' onClick={close}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>{ title }</p>
          <button className='delete' onClick={close}></button>
        </header>
        <section className='modal-card-body'>
          <p className='control'>{ message }</p>
        </section>
        <footer className='modal-card-foot'>
          <button type='button' className='button is-success' onClick={confirm}>Yes</button>
          <button type='button' className='button' onClick={close}>No</button>
        </footer>
      </div>
    </div>
  );
};

export default ConfirmModal;
