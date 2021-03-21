let catchAsyncErrors = require("../utils/catchAsyncErrors");
let User = require("../models/User");
let sendJwt = require("../utils/sendJwt");
let AppError = require("../utils/AppError");
let jwt = require("jsonwebtoken");

exports.signup = catchAsyncErrors(async (req, res, next) => {
  let { username, email, password, passwordConfirm } = req.body;
  let newUser = await User.create({
    username,
    email,
    password,
    passwordConfirm,
  });
  sendJwt(newUser, req, res, 201);
});

exports.signIn = catchAsyncErrors(async (req, res, next) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("Invalid email or password", 400));
  }
  //here check the password validity
  let isPassMatch = await user.isPasswordMatch(password);
  if (!isPassMatch) {
    return next(new AppError("Invalid email or password", 400));
  }
  sendJwt(user, req, res, 200);
});

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  let token;
  if (
    req.headers["authorization"] &&
    req.headers["authorization"].startsWith("Bearer")
  ) {
    token = req.headers["authorization"].split(" ")[1];
  } else if (req.cookies["jwtToken"]) {
    token = req.cookies["jwtToken"];
  }

  if (!token) {
    return next(
      new AppError("you are not authorized to access this route", 401)
    );
  }
  //here we get the data out of the token
  let { _id, iat } = jwt.verify(token, process.env.JWT_SECRET);

  let user = await User.findById(_id);
  if (!user) {
    return next(new AppError("there is no user related to this token", 401));
  }

  let isPassChangedRecently = user.isPasswordChangedRecently(iat);
  if (isPassChangedRecently) {
    return next(
      new AppError("your password was recently changed please login again", 401)
    );
  }

  req.user = user;
  next();
});

exports.logout = (req, res, next) => {
  res.cookie("jwtToken", "logout babe", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.redirect("/");
};

exports.getCurrentUser = (req, res, next) => {
  req.user.password = undefined;
  req.user.passwordResetToken = undefined;
  req.user.passwordChangedAt = undefined;
  res.json({
    status: "success",
    user: req.user,
  });
};
