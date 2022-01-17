const User = require('../models/user');
const ValidationError = require('../errors/validation_error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  return User
    .create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Неверно переданы данные пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res) => User
  .find()
  .then((users) => {
    console.log(users);
    res.status(200).send(users);
  })
  .catch((err) => {
    console.log(err.name);
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  });

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  return User
    .findById(id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      console.log(err.name);
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });

  // res.status(200).send(user);
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  return User
    .findByIdAndUpdate(
      req.params.id,
      { name, about },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  return User
    .findByIdAndUpdate(
      req.params.id,
      { avatar },
      {
        new: true,
        runValidators: true,
        upsert: true,
      },
    )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send({ message: 'Внутренняя ошибка сервера' });
    });
};
