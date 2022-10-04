import { useEffect } from 'react';

function OnEscClose(onEscape) {
  useEffect(() => {
    function handleEscClose(e) {
      const ESC_CODE = 'Escape';
      if (e.key === ESC_CODE) {
        onEscape();
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => document.removeEventListener('keydown', handleEscClose);
  }, [onEscape]);
}

export default OnEscClose;
