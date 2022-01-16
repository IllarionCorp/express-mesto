const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User
    .create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
      res.send(err.name);
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
