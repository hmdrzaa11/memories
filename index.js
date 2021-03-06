let express = require("express");
require("dotenv").config({ path: `${__dirname}/.env` });
let morgan = require("morgan");

let usersRouter = require("./routes/users");

let app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//body parser
app.use(express.json());

//api
app.use("/api/v1/users", usersRouter);

module.exports = app;
