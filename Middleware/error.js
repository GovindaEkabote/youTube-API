const ErrorHandler = require("../utils/ErrorHandling");

module.exports = (err, req, res, next) => {
  // Set default values for status code and message
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // Wrong Mongodb Id Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web token is invalid, try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT Expire error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web token is Expired, try again `;
    err = new ErrorHandler(message, 400);
  }

  // Send a structured response
  res.status(err.statusCode).json({
    success: false,
    message: err.message, // Send the error message only
    // Optionally, you can include a stack trace in development only
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
