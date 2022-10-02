import React from 'react';

function Menu({ isOpen, email, onSignOut }) {
  return (
    <ul className={`menu ${isOpen && 'menu_opened'}`}>
        <li className='menu__email'>{email}</li>
        <li className='menu__link' onClick={onSignOut}>Выйти</li>
    </ul>
  )
}

export default Menu;
