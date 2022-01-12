const User = require('../models/user');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  return User
    .create({ name, about, avatar })
    .then((user) => {
      res.status(201).send({ data: user });
    })
    .catch((err) => {
      // if (err.name === 'SomeErrorName') {
      // eslint-disable-next-line max-len
      //   res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя.' });
      // } else {
      //   res.status(500).send({ message: 'Ошибка по умолчанию' });
      // }
      res.send(err.name);
    });
};

module.exports.getUsers = (req, res) => User
  .find({})
  .then((user) => {
    res.status(200).send(user);
  })
  .catch(() => {
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  });

module.exports.getUser = (req, res) => {
  const { id } = req.params;
  const user = User.find((u) => u.id === id);

  res.status(200).send(user);
};
