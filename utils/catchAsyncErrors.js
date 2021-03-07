module.exports = (routHandler) => {
  return (req, res, next) => {
    routHandler(req, res, next).catch((error) => next(error));
  };
};
