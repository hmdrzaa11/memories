let router = require("express").Router();
let {
  createMemory,
  uploader,
  resizeImage,
  getAllMemories,
  updateMemory,
  deleteMemory,
} = require("../controllers/memories");
const { isAuthenticated } = require("../controllers/users");

router
  .route("/")
  .post(isAuthenticated, uploader.single("image"), resizeImage, createMemory)
  .get(getAllMemories);

router
  .route("/:memId")
  .patch(isAuthenticated, uploader.single("image"), resizeImage, updateMemory)
  .delete(isAuthenticated, deleteMemory);

module.exports = router;
