import React from 'react';
import iconApprove from '../../images/icon-approve.svg';
import iconReject from '../../images/icon-reject.svg';

function InfoTooltip({ name, isInfoTooltipOpen, onClose }) {

  return (
    <section className={`popup popup_${name} ${isInfoTooltipOpen.open && 'popup_opened'}`}>
      <div className='popup__content'>
        <button
          type='button'
          aria-label='Закрыть'
          className='popup__button-close'
          onClick={onClose}
        />

        <img
          className='popup__icon'
          src={isInfoTooltipOpen.success ? iconApprove : iconReject}
          alt='#' />

        <p className='popup__text'>{isInfoTooltipOpen.message}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
