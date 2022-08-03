const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, NODE_ENV ? JWT_SECRET : 'dev-secret');
    req.user = payload;
  } catch (err) {
    next(new AuthError('Необходима авторизация'));
  }
  next();
};
