const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });

  //MONGOOSE DUPLICATE KEY ERROR
  if (err.code === 11000){
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
    err = new ErrorHandler(message, 400)
  };

  if(err.name === "JsonWebTokenError"){
    const message = `Json Web Token is invalid, Try again`;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRED
  if(err.name === "TokenExpiredError"){
    const message = `Json Web Token is Expired, Try again`;
    err = new ErrorHandler(message, 400);
  }

};
