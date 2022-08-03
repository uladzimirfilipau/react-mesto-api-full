import React from 'react';
import iconApprove from '../../images/icon-approve.svg';
import iconReject from '../../images/icon-reject.svg';

function InfoTooltip({ state, name, isOpen, onClose }) {

  return (
    <section className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__content'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__button-close'
          onClick={onClose}
        />

        <img 
          className='popup__icon' 
          src={state ? iconApprove : iconReject} 
          alt='#' />

        <p className='popup__text'>
          {
            state 
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
          }
        </p>
      </div>
    </section>
  );
}

export default InfoTooltip;
