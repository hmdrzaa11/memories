let router = require("express").Router({ mergeParams: true });
let reviewController = require("../controllers/reviews");
const { isAuthenticated } = require("../controllers/users");

router
  .route("/")
  .post(isAuthenticated, reviewController.createReview)
  .get(reviewController.getAllReviews);

router
  .route("/:reviewId")
  .patch(isAuthenticated, reviewController.updateReview)
  .delete(isAuthenticated, reviewController.deleteAReview);

module.exports = router;
