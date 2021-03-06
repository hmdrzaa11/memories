let app = require("./index");
let mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/.env` });

async function connectToDB() {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("DB in the House!");
  } catch (error) {
    process.exit(1);
  }
}

connectToDB();

let PORT = process.env.PORT || 8000;

app.listen(PORT, () =>
  console.log(`server in ${process.env.NODE_ENV} and on port ${PORT}`)
);
