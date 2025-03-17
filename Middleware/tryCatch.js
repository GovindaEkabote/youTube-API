const tryCatchError = (tryCatchErrors) => {
  Promise.resolve(tryCatchErrors(req, res, next)).catch(next);
};

module.exports = tryCatchError;