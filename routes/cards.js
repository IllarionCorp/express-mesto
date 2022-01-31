const router = require('express').Router();
const {
  getCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const { validationCard, validationCardId } = require('../middleware/validation');

router.get('/', getCards);

router.post('/', validationCard, createCard);

router.delete('/:cardId/likes', validationCardId, dislikeCard);

router.delete('/:cardId', validationCardId, deleteCard);

router.put('/:cardId/likes', validationCardId, likeCard);

module.exports = router;
