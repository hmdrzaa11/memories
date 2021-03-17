let router = require("express").Router();
let {
  createMemory,
  uploader,
  resizeImage,
  getAllMemories,
  updateMemory,
  deleteMemory,
  getSingleMemory,
} = require("../controllers/memories");
const { isAuthenticated } = require("../controllers/users");
let reviewRouter = require("./reviews");

router
  .route("/")
  .post(isAuthenticated, uploader.single("image"), resizeImage, createMemory)
  .get(getAllMemories);

router
  .route("/:memId")
  .patch(isAuthenticated, uploader.single("image"), resizeImage, updateMemory)
  .delete(isAuthenticated, deleteMemory)
  .get(getSingleMemory);

//Nested Routes
router.use("/:memId/reviews", reviewRouter);

module.exports = router;
