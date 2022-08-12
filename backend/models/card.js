const { Schema, model } = require('mongoose');
const isUrl = require('validator/lib/isURL');

const cardSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
    link: {
      type: String,
      required: true,
      validate: [isUrl, 'Неверный формат ссылки'],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: {
      type: [Schema.Types.ObjectId],
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

module.exports = model('card', cardSchema);
