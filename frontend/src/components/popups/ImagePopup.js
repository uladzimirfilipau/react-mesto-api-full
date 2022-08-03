import React from 'react';

function ImagePopup({ card, onClose }) {

  return (
    <section
      className={`popup popup_image ${card && 'popup_opened'}`}
      aria-label='Посмотреть фотографию'
    >
      <figure className='popup__figure'>
        <button
          type='button'
          aria-label='close button'
          className='popup__button-close'
          onClick={onClose}
        />

        <img
          src={card && card.link} alt={card && card.name} className='popup__image'
        />
        <figcaption
          className='popup__figure-caption'>{card && card.name}
        </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;
