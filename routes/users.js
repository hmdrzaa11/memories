let router = require("express").Router();
let userController = require("../controllers/users");

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);
router.get("/logout", userController.logout);
router.get(
  "/me",
  userController.isAuthenticated,
  userController.getCurrentUser
);

module.exports = router;
