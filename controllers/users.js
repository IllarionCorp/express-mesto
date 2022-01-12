const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({ data: user });
      res.status(200);
    })
    .catch((err) => {
      if (err.name === 'SomeErrorName') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      } else {
        res.status(500).send({ message: 'Ошибка по умолчанию' });
      }
    });
};

module.exports.getUser = (req, res) => {
  User.find({})
    .then((user) => {
      res.send({ data: user });
      res.status(200);
    })
    .catch(() => res.status(500).send({ message: 'Ошибка по умолчанию' }));
};
console.log();
