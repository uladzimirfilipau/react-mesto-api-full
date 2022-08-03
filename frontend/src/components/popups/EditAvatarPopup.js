import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  useEffect(() => {
    if (isOpen) {
      avatarRef.current.value = '';
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name={'edit-avatar'}
      title={'Обновить аватар'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type='url'
        name='avatar'
        id='avatar'
        placeholder='Ссылка на картинку'
        required
        className='popup__input popup__input_type_avatar'
        ref={avatarRef}
      />
      <span className='popup__error avatar-error' />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
