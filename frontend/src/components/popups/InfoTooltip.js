import React from 'react';
import iconApprove from '../../images/icon-approve.svg';
import iconReject from '../../images/icon-reject.svg';

function InfoTooltip({ name, isInfoTooltipOpen, onClose }) {
  const { open, success, message } = isInfoTooltipOpen;

  if (!open) {
    return null;
  }

  return (
    <section className={`popup popup_${name} ${open && 'popup_opened'}`}>
      <div className='popup__content'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__button-close'
          onClick={onClose}
        />

        <img
          className='popup__icon'
          src={success ? iconApprove : iconReject}
          alt={success ? 'Успех' : 'Неудача'}
        />

        <p className='popup__text'>{message}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
