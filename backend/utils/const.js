const url = /^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/;
const AVATAR_IMAGE = 'https://e7.pngegg.com/pngimages/438/835/png-clipart-kooot-com-computer-icons-businessperson-marketing-business-company-service.png';

const WRONG_EMAIL = 'Пользователь с таким email уже существует';
const WRONG_DATA = 'Переданы некорректные данные `Имя`, `Профессия` или `Аватар` для создания профиля пользователя';
const WRONG_USERDATA = 'Неправильные почта или пароль';
const USER_NOTFOUND = 'Пользователь по указанному _id не найден';
const DATA_NOT_UPDATE = 'Переданы некорректные данные `Имя` или `Профессия` для обновления профиля пользователя';
const AVATAR_NOT_UPDATE = 'Переданы некорректные данные для обновления аватара';

const WRONG_CARD_DATA = 'Переданы некорректные `Имя` или `Ссылка` для создания карточки';
const CARD_NOTFOUND = 'Карточка с указанным _id не найдена';
const ERROR_DELETE = 'Можно удалять только свои карточки';
const WRONG_CARDID = 'Передан некорректный _id для удаления карточки';
const CARDID_NOTFOUND = 'Передан несуществующий _id карточки';
const WRONG_LIKE_DATA = 'Переданы некорректные данные для постановки лайка';
const WRONG_DELETE_LIKE_DATA = 'Переданы некорректные данные для снятия лайка';
const CARD_DELETE = { message: 'Карточка удалена' };

module.exports = {
  url,
  AVATAR_IMAGE,
  WRONG_EMAIL,
  WRONG_DATA,
  WRONG_USERDATA,
  USER_NOTFOUND,
  DATA_NOT_UPDATE,
  AVATAR_NOT_UPDATE,
  WRONG_CARD_DATA,
  CARD_NOTFOUND,
  ERROR_DELETE,
  WRONG_CARDID,
  CARDID_NOTFOUND,
  WRONG_LIKE_DATA,
  WRONG_DELETE_LIKE_DATA,
  CARD_DELETE,
};
