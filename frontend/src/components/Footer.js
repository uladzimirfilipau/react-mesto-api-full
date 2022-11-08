import React from 'react';
import { Switch, Route } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <Switch>
      <Route exact path='/'>
        <footer className='footer'>
          <p className='footer__copyright'>
            &copy;&nbsp;{year}.&nbsp;
            <a
              className='footer__link'
              href='https://github.com/uladzimirfilipau'
              target='_blank'
              rel='noopener noreferrer'
              title='https://github.com/uladzimirfilipau'
            >
              ULADZIMIR FILIPAU.
            </a>
          </p>
        </footer>
      </Route>
    </Switch>
  );
}

export default Footer;
