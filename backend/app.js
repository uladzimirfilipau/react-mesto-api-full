require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('./middlewares/cors');
const routes = require('./routes/index');

const { PORT, MONGODB } = require('./utils/config');
const handleError = require('./errors/handleError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

app.use(cors);

app.use(helmet());
app.use(bodyParser.json());

app.use(requestLogger);
app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use(handleError);

mongoose.connect(MONGODB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.listen(PORT);
