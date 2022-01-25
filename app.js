/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./middleware/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const signupRouter = require('./routes/signup');
const signinRouter = require('./routes/signin');
const errorHandler = require('./middleware/error-handler');
const NotFoundError = require('./errors/not-found-error');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/express-mesto', () => {
  console.log('CHECK DB');
});
app.use(express.json());
app.use(cookieParser());

app.use('/signin', signinRouter);
app.use('/signup', signupRouter);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use((res, req, next) => {
  next(new NotFoundError('Страницы пока нет'));
});

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Say hello my little ${PORT}`);
});
