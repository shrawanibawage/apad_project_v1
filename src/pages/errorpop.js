import React from 'react';
import Modal from 'react-modal';

const ErrorPop = ({ isOpen, onClose, errorMessage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentLabel="Error Pop"
    >
      <h2>Error</h2>
      <p>{errorMessage}</p>
      <button onClick={onClose}>Close</button>
    </Modal>
  );
};

export default ErrorPop;