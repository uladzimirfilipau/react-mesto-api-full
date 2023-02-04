import React from 'react';
import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import useFormAndValidation from '../hooks/useFormAndValidation';

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid } = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

  return (
    <AuthForm
      title={'Регистрация'}
      buttonText={'Зарегистрироваться'}
      onRegister={onRegister}
      values={values}
      errors={errors}
      isValid={isValid}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    >
      <p className='form__caption'>
        Уже зарегистрированы?&nbsp;
        <Link to='signin' className='form__link'>
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
