import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className='not-found'>
      <h3 className='not-found__title'>
        <span>404</span> - Страница по вашему запросу не найдена
      </h3>
      <Link className='button button_type_to-main' to='signup' replace>
        Зарегестрируйтесь
      </Link>
      <p className='not-found__text'>или</p>
      <Link className='button button_type_to-main' to='signin' replace>
        Войдите
      </Link>
    </div>
  );
}

export default PageNotFound;
