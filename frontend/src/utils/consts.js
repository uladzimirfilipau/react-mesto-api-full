export const handleError = (err) => {
  console.log(err);
};

export let BASE_URL = '';
const { NODE_ENV } = process.env;
if (NODE_ENV === 'production') {
  BASE_URL = 'https://react-mesto-api-f6b8.onrender.com';
} else {
  BASE_URL = 'http://localhost:3001';
}

export const SUCCESS_REGISTER = 'Вы успешно зарегистрировались!';
export const SOMETHING_WRONG = 'Что-то пошло не так! Попробуйте ещё раз.';
export const WRONG_DATA = 'Неверный логин или пароль! Попробуйте ещё раз.';
export const CARD_DELETE = 'Карточка удалена';
export const ERROR_DELETE = 'Удалять можно только свои карточки';

export const WRONG_EMAIL = 'Некорректный email';