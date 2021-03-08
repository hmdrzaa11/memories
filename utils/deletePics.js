let path = require("path");
let fs = require("fs");
module.exports = async (filename) => {
  if (filename === "default.jpg") {
    return;
  }

  await fs.promises.unlink(
    path.join(__dirname, `../public/images/memories/${filename}`)
  );
};
