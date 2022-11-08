import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Menu({ isOpen, email, onSignOut }) {
  return (
    <Switch>
      <Route exact path='/'>
        <ul className={`menu ${isOpen && 'menu_opened'}`}>
          <li className='menu__email'>{email}</li>
          <li className='menu__link' onClick={onSignOut}>
            Выйти
          </li>
        </ul>
      </Route>
    </Switch>
  );
}

export default Menu;
