import React from 'react';

function AuthForm({
  email,
  password,
  title,
  buttonText,
  children,
  handleEmailChange,
  handlePasswordChange,
  handleSubmit,
}) {
  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>{title}</h2>

      <input
        className='form__input form__input_type_email'
        placeholder='Email'
        name='email'
        type='email'
        id='email'
        value={email}
        onChange={handleEmailChange}
        minLength='8'
        maxLength='30'
        required
      />

      <input
        className='form__input form__input_type_password'
        placeholder='Пароль'
        name='password'
        type='password'
        id='password'
        value={password}
        onChange={handlePasswordChange}
        minLength='8'
        maxLength='20'
        required
      />

      <button type='submit' className='form__submit-button'>
        {buttonText}
      </button>

      {children}

    </form>
  );
}

export default AuthForm;
