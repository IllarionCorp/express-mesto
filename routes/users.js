const router = require('express').Router();
const {
  getUsers,
  getUser,
  getAnyUser,
  updateAvatar,
  updateUser,
} = require('../controllers/users');
const { validationUserId, validationUserUpdate, validationAvatarUpdate } = require('../middleware/validation');

router.get('/', getUsers);

router.get('/me', getUser);

router.get('/:id', validationUserId, getAnyUser);

router.patch('/me', validationUserUpdate, updateUser);

router.patch('/me/avatar', validationAvatarUpdate, updateAvatar);

module.exports = router;
