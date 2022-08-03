import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password });
  }

  return (
    <AuthForm
      email={email}
      password={password}
      title={'Регистрация'}
      buttonText={'Зарегистрироваться'}
      handleSubmit={handleSubmit}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
    >
      <p className='form__caption'>
        Уже зарегистрированы?&nbsp;
        <Link to='sign-in' className='form__link'>
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
