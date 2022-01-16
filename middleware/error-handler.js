const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

    console.log(statusCode)
    console.log(err.message)
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
