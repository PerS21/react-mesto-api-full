const express = require('express');
const mongoose = require('mongoose');
const process = require('process');
const {
  celebrate,
  errors,
  Joi,
} = require('celebrate');
const validator = require('validator');
const routes = require('./routes');
const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const cors = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const isURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

// Слушаем 3000 порт
const {
  PORT = 3001,
} = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

module.exports.createCard = (req, res) => {
};

app.use(requestLogger);

app.use(cors);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    avatar: Joi.string().custom(isURL),
  }),
}), createUser);

app.use(auth);

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Ошибка на сервере' } = err;
  res.status(statusCode).send({
    message,
  });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
