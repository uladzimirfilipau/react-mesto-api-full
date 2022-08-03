import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePlacePopup({ isOpen, onCardDelete, onClose }) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
    onClose();
  }

  return (
    <PopupWithForm 
      name={'delete-card'}
      title={'Вы уверены?'} 
      buttonText={'Да'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeletePlacePopup;
