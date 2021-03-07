let AppError = require("../utils/AppError");

let handleDuplicatedFields = (err) => {
  let duplicated = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  return new AppError(`${duplicated} is already exists.`, 400);
};

let handleValidationErrors = (err) => {
  let message = Object.values(err.errors)
    .map((er) => er.message)
    .join("-");
  return new AppError(message, 400);
};

let handleJwtExpiredToken = (err) => {
  return new AppError("token has been expired please login again", 401);
};

let handleInvalidJwt = (err) => {
  return new AppError("token is invalid please login again", 401);
};

module.exports = globalErrorHandler = (err, req, res, next) => {
  if (err.code === 11000) err = handleDuplicatedFields(err);
  if (err.name === "ValidationError") err = handleValidationErrors(err);
  if (err.name === "TokenExpiredError") err = handleJwtExpiredToken(err);
  if (err.name === "JsonWebTokenError") err = handleInvalidJwt(err);

  let statusCode = err.statusCode || 500;
  let jsonResponse = {
    status: err.status,
    message: err.message,
  };
  if (process.env.NODE_ENV === "development") jsonResponse["error"] = err;

  res.status(statusCode).json(jsonResponse);
};
