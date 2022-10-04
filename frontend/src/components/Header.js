import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ email, handleMenuOpen, isOpen, onClose, onSignOut }) {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Место' className='header__logo' />

      <Switch>
        <Route path='/signin'>
          <Link to='/signup' className='header__link'>
            Регистрация
          </Link>
        </Route>

        <Route path='/signup'>
          <Link to='/signin' className='header__link'>
            Войти
          </Link>
        </Route>

        <Route exact path='/'>
          <ul className='header__menu'>
            <li className='header__email'>{email}</li>
            <li className='header__link' onClick={onSignOut}>
              Выйти
            </li>
          </ul>

          {isOpen ? (
            <button type='button' className='header__close-button' onClick={onClose}></button>
          ) : (
            <button type='button' className='header__button' onClick={handleMenuOpen}>
              <span></span>
            </button>
          )}
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
