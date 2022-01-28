const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUsers,
  getUser,
  getAnyUser,
  updateAvatar,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().required(),
  }),
}), getAnyUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri().required(),
  }),
}), updateAvatar);

module.exports = router;
