const router = require('express').Router();
const { getUser } = require('../controllers/users.js');

router.get('/users', getUser);

module.exports = router;
