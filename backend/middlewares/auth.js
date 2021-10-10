const jwt = require('jsonwebtoken');
const ParamsError = require('../utils/errors/paramsError');

const {
  NODE_ENV,
  JWT_SECRET = 'pers',
} = process.env;

// if (!req.headers.cookie) {
//   return next(new NotEnoughRights('Нет кук'));
// }

// const authorization = req.headers.cookie;

// function getCookie(name) {
//   const matches = authorization.match(new RegExp(
//     // eslint-disable-next-line no-useless-escape
//     `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
//   ));
//   return matches ? decodeURIComponent(matches[1]) : false;
// }

module.exports = (req, res, next) => {
  const token = req.headers.jwt;

  if (!token) {
    return next(new ParamsError('Необходима авторизация'));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new ParamsError('Ошибка токена'));
    req.user = {
      _id: decoded.id,
    };
  });
  next();
};

module.exports = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new ParamsError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new ParamsError('Ошибка токена'));

    req.user = {

      _id: decoded.id,

    };
  });

  next();
};
