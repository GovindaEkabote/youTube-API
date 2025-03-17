const jwt = require("jsonwebtoken");
const User = require("../Model/user.model");
const ErrorHandler = require("../utils/ErrorHandling"); // Ensure this file exists

exports.IsAuthenticatedUser = async (req, res, next) => {
  try {
    // ✅ Extract token from cookies
    const token = req.cookies?.token; 

    if (!token) {
      return next(new ErrorHandler("Please login to access this resource", 401));
    }

    // ✅ Decode token
    const decodedData = jwt.verify(token, process.env.JWT);

    // ✅ Attach user to request
    const user = await User.findById(decodedData.id);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    req.user = user; // ✅ Fix: Ensure req.user exists

    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
};
