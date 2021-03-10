let Review = require("../models/Review");
const catchAsyncErrors = require("../utils/catchAsyncErrors");

exports.createReview = catchAsyncErrors(async (req, res, next) => {
  let { memId } = req.params;
  let userId = req.user._id;
  let { review, rating } = req.body;
  let newReview = await Review.create({
    review,
    rating,
    reviewer: userId,
    memory: memId,
  });
  res.status(201).json({
    status: "success",
    review: newReview,
  });
});

exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  let { memId } = req.params;
  let allReviews = await Review.find({ memory: memId });
  res.status(200).json({
    status: "success",
    reviews: allReviews,
  });
});

exports.updateReview = catchAsyncErrors(async (req, res, next) => {
  let { memId, reviewId } = req.params;
  let reviewer = req.user._id;
});
