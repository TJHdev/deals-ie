// modal imports
import React from 'react';
import Modal from 'react-modal';

export const Modal1 = ({ onRequestClose, ...otherProps }) => (
  <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
    <button type="button" onClick={onRequestClose}>
      close
    </button>
    <div>I am a modal</div>
  </Modal>
);

export const Modal2 = ({ onRequestClose, foo, ...otherProps }) => (
  <Modal isOpen onRequestClose={onRequestClose} {...otherProps}>
    <button type="button" onClick={onRequestClose}>
      close
    </button>
    <div>
      second modal
      {foo}
    </div>
  </Modal>
);
