/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const aRouter = require('./routes/a');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json);

mongoose.connect('mongodb:localhost:27017/express-mesto', () => {
  console.log('CHECK DB');
});
app.use(express.json());
app.use('/', aRouter);
app.use('/users', usersRouter);
// app.get('/', (req, res) => {
//   res.send('GLAVNAY');
// });
app.listen(PORT, () => {
  console.log(`Say hello my little ${PORT}`);
});
