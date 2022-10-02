import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='not-found'>
      <h3 className='not-found__title'>
        <span>404</span>Страница по&nbsp;вашему запросу не&nbsp;найдена
      </h3>

      <Link className='not-found__link' to='signup'>
        Зарегистрируйтесь
      </Link>

      <p className='not-found__text'>или</p>

      <Link className='not-found__link' to='signin'>
        Войдите в аккаунт
      </Link>
    </div>
  );
}

export default PageNotFound;
