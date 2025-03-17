const tryCatchError = (tryCatchErrors) =>(req,res,next)=> {
  Promise.resolve(tryCatchErrors(req, res, next)).catch(next);
};
module.exports = tryCatchError;