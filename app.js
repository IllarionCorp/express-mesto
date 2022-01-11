const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb:localhost:27017/express-mesto', () => {
  console.log("Я сосал, меня ебали");
});

app.use('/user', router);

app.listen(PORT, () => {
  console.log(`Say hello my little ${PORT}`);
});
