let router = require("express").Router();
let userController = require("../controllers/users");

router.post("/signup", userController.signup);
router.post("/signin", userController.signIn);

module.exports = router;
