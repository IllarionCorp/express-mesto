const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { loginUser } = require('../controllers/users');

router.post('/', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().required(),
    password: Joi.string().required().min(8).required(),
  }),
}), loginUser);

module.exports = router;
