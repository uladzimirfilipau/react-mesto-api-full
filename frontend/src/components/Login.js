import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Login({ onLogin }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
  }

  return (
    <AuthForm
      title={'Вход'}
      buttonText={'Войти'}
      values={values}
      errors={errors}
      isValid={isValid}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    >
      <p className='form__caption'>
        Не зарегистрированы?&nbsp;
        <Link to='signup' className='form__link'>
          Регистрация
        </Link>
      </p>
    </AuthForm>
  );
}

export default Login;
