let jwt = require("jsonwebtoken");

module.exports = (user, req, res, statusCode) => {
  let token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  //assign it in the cookie and also send ir as response
  let secure =
    (req.secure || req.headers["x-forwarded-proto"] === "https") && true;
  res.cookie("jwtToken", token, {
    httpOnly: true,
    secure: secure,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    user,
    token,
  });
};
