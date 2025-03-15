// creating token and saving in cookies.
const sentToken = async (user, statusCode, res) => {
    const jwtToken = user.getJWTToken();
    const referenceToken =await user.getReferenceToken();
  
    // Options for cookies
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };
  
    // Respond with tokens and user info
    res.status(statusCode).cookie("token", jwtToken, options).json({
      success: true,
      user,
      jwtToken,
      referenceToken,
    });
  };
  
  module.exports = sentToken;