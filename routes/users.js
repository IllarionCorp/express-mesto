const router = require('express').Router();
const { getUser } = require('../controllers/users.js');

router.get('/user', getUser);

module.exports = router;
