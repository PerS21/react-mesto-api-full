const mongoose = require('mongoose');
const validator = require('validator');

const isMail = (value) => {
  const result = validator.isEmail(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const isURL = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new Error('URL validation err');
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  email: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    validate: isMail,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: isURL,
  },
});

module.exports = mongoose.model('user', userSchema);
