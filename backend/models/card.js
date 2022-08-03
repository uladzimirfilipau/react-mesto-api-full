const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Поле `Название` обязательно для заполнения'],
      minLength: [2, 'Минимальная длина поля `Название` - 2 символа'],
      maxLength: [30, 'Максимальная длина поля `Название` - 30 символов'],
    },
    link: {
      type: String,
      required: [true, 'Поле `Ссылка` обязательно для заполнения'],
      validate: [isUrl, 'Неверный формат ссылки'],
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('card', cardSchema);
