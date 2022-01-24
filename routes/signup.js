const router = require('express').Router();
// const { createUser } = require('../controllers/users');

router.get('/', /* createUser */ (req, res) => res.send('1'));

module.exports = router;
