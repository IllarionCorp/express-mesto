const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');
const ConflictError = require('../errors/conflict-error');
const Unauthorized = require('../errors/unauthorized-error');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.code === 11000) {
        next(new ConflictError(`Пользователь c email: ${email} уже существует`));
      } else {
        next(err);
      }
    });
};

module.exports.getUsers = (req, res, next) => User
  .find()
  .then((users) => {
    res.status(200).send(users);
  })
  .catch((err) => {
    next(err);
  });

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;
  return User
    .findById(id)
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  return User
    .findByIdAndUpdate(
      id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  return User
    .findByIdAndUpdate(
      id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new NotFoundError(`Пользователь с id ${id} не найден`))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else if (err.name === 'CastError') {
        next(new BadRequestError('Невалидный id'));
      } else {
        next(err);
      }
    });
};

module.exports.loginUser = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Неверный логин или пароль');
      }
      const token = jwt.sign({ _id: user.id }, 'some-secret-key', { expiresIn: '7d' });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true });
      console.log(password);
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        throw new Unauthorized('Неверный логин или пароль');
      }
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
};
