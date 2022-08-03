import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';

function Login({ onLogin }) {
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
    onLogin({ email, password });
  }

  return (
    <AuthForm
      email={email}
      password={password}
      title={'Вход'}
      buttonText={'Войти'}
      handleSubmit={handleSubmit}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
    >
      <p className='form__caption'>
        Не зарегистрированы?&nbsp;
        <Link to='sign-up' className='form__link'>
          Регистрация
        </Link>
      </p>
    </AuthForm>
  );
}

export default Login;
