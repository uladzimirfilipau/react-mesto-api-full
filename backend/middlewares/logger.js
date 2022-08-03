const winston = require('winston');
const expressWinston = require('express-winston');

// создать логгер запросов к серверу
const requestLogger = expressWinston.logger({
  // куда писать лог
  transports: [new winston.transports.File({ filename: 'request.log' })],
  // формат записи логов
  format: winston.format.json(),
});

// создать логгер ошибок
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: 'error.log' })],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
