import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ email, handleMenuOpen, isOpen, handleMenuClose, onSignOut }) {
  return (
    <header className='header'>
      <img src={headerLogo} alt='Логотип Место' className='header__logo' />

      <Switch>
        <Route path='/signin'>
          <Link to='/signup' className='header__menu-item'>
            Регистрация
          </Link>
        </Route>

        <Route path='/signup'>
          <Link to='/signin' className='header__menu-item'>
            Войти
          </Link>
        </Route>

        <Route exact path='/'>
          <ul className='header__menu'>
            <li className='header__menu-item'>{email}</li>
            <li className='header__menu-item' aria-label='Выйти из аккаунта'>
              <button className='header__menu-logout' type='button' onClick={onSignOut}>
                Выйти
              </button>
            </li>
          </ul>

          {isOpen ? (
            <button
              type='button'
              className='header__close-button'
              onClick={handleMenuClose}
            ></button>
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
