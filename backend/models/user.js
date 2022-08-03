/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');
const AuthError = require('../errors/AuthError');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: [2, 'Минимальная длина поля `Имя` - 2 символа'],
      maxlength: [30, 'Максимальная длина поля `Имя` - 30 символов'],
      default: 'Жак-Ив Кусто',
    },
    about: {
      type: String,
      minlength: [2, 'Минимальная длина поля `Профессия` - 2 символа'],
      maxlength: [30, 'Максимальная длина поля `Профессия` - 30 символов'],
      default: 'Исследователь',
    },
    avatar: {
      type: String,
      default:
        'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
      validate: [isUrl, 'Неверный формат ссылки'],
    },
    email: {
      type: String,
      required: [true, 'Поле `Email` обязательно для заполнения'],
      unique: true,
      validate: [isEmail, 'Неверный формат Email'],
    },
    password: {
      type: String,
      required: [true, 'Поле `Пароль` обязательно для заполнения'],
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError('Неправильные почта или пароль'));
        }
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
