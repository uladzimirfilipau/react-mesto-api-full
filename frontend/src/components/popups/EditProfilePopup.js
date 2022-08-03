import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    if (isOpen) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [isOpen, currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name={'edit-profile'}
      title={'Редактировать профиль'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='text'
        name='name'
        id='name'
        placeholder='Введите имя'
        required
        minLength='2'
        maxLength='40'
        className='popup__input popup__input_type_name'
        value={name}
        onChange={handleNameChange}
      />
      <span className='popup__error name-error' />
      <input
        type='text'
        name='about'
        id='about'
        placeholder='Введите профессию'
        required
        minLength='2'
        maxLength='200'
        className='popup__input popup__input_type_about'
        onChange={handleDescriptionChange}
        value={description}
      />
      <span className='popup__error about-error' />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
