const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');
const AuthError = require('../errors/AuthError');
const { WRONG_USERDATA, AVATAR_IMAGE } = require('../utils/const');

const userSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Введите имя',
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 30,
      default: 'Введите профессию',
    },
    avatar: {
      type: String,
      default: AVATAR_IMAGE,
      validate: [isUrl, 'Неверный формат ссылки'],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, 'Неверный формат Email'],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUser(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthError(WRONG_USERDATA));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthError(WRONG_USERDATA));
        }
        return user;
      });
    });
};

module.exports = model('user', userSchema);
