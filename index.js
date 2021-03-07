let express = require("express");
require("dotenv").config({ path: `${__dirname}/.env` });
let morgan = require("morgan");
let errorHandler = require("./controllers/errors");
let cookieParser = require("cookie-parser");
let usersRouter = require("./routes/users");
const AppError = require("./utils/AppError");

let app = express();

//trust proxy for heroku proxy to enable cookie signing
app.enable("trust proxy");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//body parser
app.use(express.json());

//coolie-parser
app.use(cookieParser());

//api
app.use("/api/v1/users", usersRouter);

//404 routes
app.all("*", (req, res, next) => {
  let message = `path ${req.originalUrl} not exist`;
  next(new AppError(message, 404));
});

//global error handler
app.use(errorHandler);

module.exports = app;
