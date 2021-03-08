let express = require("express");
require("dotenv").config({ path: `${__dirname}/.env` });
let morgan = require("morgan");
let errorHandler = require("./controllers/errors");
let cookieParser = require("cookie-parser");
let usersRouter = require("./routes/users");
let memoriesRouter = require("./routes/memories");
const AppError = require("./utils/AppError");

let app = express();

//trust proxy for heroku proxy to enable cookie signing
app.enable("trust proxy");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//static
app.use(express.static(`${__dirname}/public`));

//body parser
app.use(express.json());
//coolie-parser
app.use(cookieParser());

//api
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/memories", memoriesRouter);

//404 routes
app.all("*", (req, res, next) => {
  let message = `path ${req.originalUrl} not exist`;
  next(new AppError(message, 404));
});

//global error handler
app.use(errorHandler);

module.exports = app;
