const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-error');
const NotFoundError = require('../errors/not-found-error');

const getCards = (req, res, next) => Card
  .find()
  .then((cards) => {
    console.log(cards[1]._id.toString());
    res.status(201).send(cards);
  })
  .catch((err) => {
    next(err);
  });

function createCard(req, res, next) {
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
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      } else {
        next(err);
      }
    });
}

const deleteCard = (req, res, next) => {
  const { id } = req.params;

  return Card
    .findByIdAndRemove(id)
    .then((cards) => {
      res.status(200).send(cards);
    })
    .catch((err) => {
      if (err.name === 'NotFoundError') {
        next(new NotFoundError(`Карточка с id ${id} не найдена`));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { id } = req.params;

  return Card
    .findByIdAndUpdate(
      id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    )
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для постановки лайка'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError(`Передан несуществующий _id карточки: ${id}`));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  const { id } = req.params;

  return Card
    .findByIdAndUpdate(
      id,
      { $pull: { likes: req.user._id } },
      { new: true },
    )
    .then((likes) => {
      res.status(200).send(likes);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для снятия лайка'));
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError(`Передан несуществующий _id карточки: ${id}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
};
