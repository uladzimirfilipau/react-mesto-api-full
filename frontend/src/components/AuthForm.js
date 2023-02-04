import React from 'react';

function AuthForm({
  title,
  buttonText,
  handleSubmit,
  handleChange,
  values,
  errors,
  isValid,
  children,
}) {
  const submitButtonClassname = `form__submit-button ${
    isValid ? 'form__submit-button_enabled' : 'form__submit-button_disabled'
  }`;

  return (
    <form className='form' onSubmit={handleSubmit}>
      <h2 className='form__title'>{title}</h2>

      <input
        className='form__input form__input_type_email'
        placeholder='Email'
        name='email'
        type='email'
        id='email'
        value={values.email || ''}
        onChange={handleChange}
        minLength='8'
        maxLength='30'
        required
      />
      <span className='form__input-error'>{errors.email}</span>

      <input
        className='form__input form__input_type_password'
        placeholder='Пароль'
        name='password'
        type='password'
        id='password'
        value={values.password || ''}
        onChange={handleChange}
        minLength='8'
        maxLength='20'
        required
      />
      <span className='form__input-error'>{errors.password}</span>

      <button type='submit' className={submitButtonClassname} disabled={!isValid}>
        {buttonText}
      </button>

      {children}
    </form>
  );
}

export default AuthForm;
