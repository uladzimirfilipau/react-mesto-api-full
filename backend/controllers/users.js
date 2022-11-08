const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const AuthError = require('../errors/AuthError');
const ConflictError = require('../errors/ConflictError');

const { JWT_SECRET, SALT } = require('../utils/config');

const {
  WRONG_EMAIL,
  WRONG_DATA,
  WRONG_USERDATA,
  USER_NOTFOUND,
  DATA_NOT_UPDATE,
  AVATAR_NOT_UPDATE,
} = require('../utils/const');

const createUser = (req, res, next) => {
  const {
    email, password, name, about, avatar,
  } = req.body;

  bcrypt
    .hash(password, SALT)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      })
        .then((newUser) => res.send({
          _id: newUser._id,
          name: newUser.name,
          about: newUser.about,
          avatar: newUser.avatar,
          email: newUser.email,
        }))
        .catch((err) => {
          if (err.code === 11000) {
            next(new ConflictError(WRONG_EMAIL));
          } else if (err.name === 'ValidationError') {
            next(new BadRequestError(WRONG_DATA));
          } else {
            next(err);
          }
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(() => {
      next(new AuthError(WRONG_USERDATA));
    });
};

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => next(new NotFoundError(USER_NOTFOUND)))
    .then((user) => res.send(user))
    .catch(next);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => next(new NotFoundError(USER_NOTFOUND)))
    .then((user) => res.send(user))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => next(new NotFoundError(USER_NOTFOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(DATA_NOT_UPDATE));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => next(new NotFoundError(USER_NOTFOUND)))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(AVATAR_NOT_UPDATE));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  login,
  getUsers,
  getUser,
  getCurrentUser,
  updateUserInfo,
  updateAvatar,
};
