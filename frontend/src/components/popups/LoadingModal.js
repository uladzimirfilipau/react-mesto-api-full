import React from 'react';

function LoadingModal({ loading, name }) {
  if (!loading) {
    return null;
  }

  return (
    <section className={`popup popup_${name} ${loading && 'popup_opened'}`}>
      <div className='popup__content'>
        <p className='popup__loading-text'>Загрузка данных.</p>
        <p className='popup__loading-text'>Пожалуйста, ожидайте...</p>
      </div>
    </section>
  );
}

export default LoadingModal;
