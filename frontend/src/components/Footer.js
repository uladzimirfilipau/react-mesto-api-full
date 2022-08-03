import React from 'react';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; {year}. VOVA F.</p>
    </footer>
  );
}

export default Footer;
