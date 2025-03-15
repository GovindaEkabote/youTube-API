const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");

exports.IsAuthenticatedUser = tryCatchError(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("please Login To access this resource", 401));
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id); 
  next();
});