/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const errorHandler = require('./middleware/error-handler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/express-mesto', () => {
  console.log('CHECK DB');
});
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '61e53b44d893e61eaefbe557',
  };

  next();
});
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.use((res, req, next) => {
  next(new NotFoundError('Страницы пока нет'));
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Say hello my little ${PORT}`);
});
