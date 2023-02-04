import { useState, useCallback } from 'react';
import isEmail from 'validator/lib/isEmail';

import { WRONG_EMAIL } from '../utils/consts';

function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const input = event.target;
    const { name, value } = input;

    if (name === 'email') {
      if (isEmail(value)) {
        input.setCustomValidity('');
      } else {
        input.setCustomValidity(WRONG_EMAIL);
      }
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    setIsValid(input.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid],
  );

  return { values, handleChange, errors, isValid, resetForm, setValues, setIsValid };
}

export default useFormAndValidation;
