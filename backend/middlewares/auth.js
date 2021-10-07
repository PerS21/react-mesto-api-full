const jwt = require('jsonwebtoken');
const NotEnoughRights = require('../utils/errors/notEnoughRights');
const ParamsError = require('../utils/errors/paramsError');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log(req.headers.cookie);
  if (!req.headers.cookie) {
    return next(new NotEnoughRights('Нет кук'));
  }

  const authorization = req.headers.cookie;

  function getCookie(name) {
    if (authorization) {
      const matches = authorization.match(new RegExp(
      // eslint-disable-next-line no-useless-escape
        `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`,
      ));
      return matches ? decodeURIComponent(matches[1]) : false;
    }
    return false;
  }

  const token = getCookie('jwt');

  if (!token) {
    return next(new NotEnoughRights('Необходима авторизация'));
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return next(new ParamsError('Ошибка токена'));
    req.user = {
      _id: decoded.id,
    };
  });
  next();
};
