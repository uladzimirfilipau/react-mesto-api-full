import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    if (isOpen) {
      setName('');
      setLink('');
    }
  }, [isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name={'add-card'}
      title={'Новое место'}
      buttonText={'Создать'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='name'
        id='place-name'
        placeholder='Название'
        required
        minLength='2'
        maxLength='30'
        className='popup__input popup__input_type_title'
        value={name}
        onChange={handleNameChange}
      />
      <span className='popup__error place-name-error' />
      <input
        type='url'
        name='link'
        id='link'
        placeholder='Ссылка на картинку'
        required
        className='popup__input popup__input_type_link'
        value={link}
        onChange={handleLinkChange}
      />
      <span className='popup__error link-error' />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
