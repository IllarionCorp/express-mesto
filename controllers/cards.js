const Card = require('../models/card');
const ValidationError = require('../errors/validation_error');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const getCards = (req, res) => Card
  .find()
  .then((cards) => {
    res.status(201).send(cards);
  })
  .catch(() => {
    res.status(500).send('Что-то пошло не так');
  });

function createCard(req, res) {
  const {
    name, link, owner, likes, createdAt,
  } = req.body;

  return Card
    .create({
      name, link, owner, likes, createdAt,
    })
    .then((card) => {
      res.status(200).send(card);
    })
    .catch(() => {
      res.status(500).send('Что-то пошло не так');
    });
}

const deleteCard = (req, res) => {
  const { id } = req.params;

  return Card
    .findByIdAndRemove(id)
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch(() => {
      res.status(500).send('Что-то пошло не так');
    });
};

const likeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch(() => {
      res.status(500).send('Что-то пошло не так');
    });
};

const dislikeCard = (req, res) => {
  Card
    .findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch(() => {
      res.status(500).send('Что-то пошло не так');
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
