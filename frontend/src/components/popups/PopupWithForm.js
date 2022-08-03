import React from 'react';

function PopupWithForm({
  name,
  title,
  children,
  buttonText = 'Сохранить',
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <form
        action='#'
        name={`form-${name}`}
        className={`popup__form popup__form_${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__button-close'
          onClick={onClose}
        />

        <h2 className='popup__title'>{title}</h2>

        {children}

        <button type='submit' name='button' className='popup__button-submit'>
          <span className='popup__button-text'>{buttonText}</span>
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
