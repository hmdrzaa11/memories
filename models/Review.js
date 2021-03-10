let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let reviewSchema = new Schema({
  review: {
    type: String,
    trim: true,
    required: [true, "review is required field"],
  },
  rating: {
    type: Number,
    default: 4.5,
    min: [0, "rating can not be below 0"],
  },

  reviewer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  memory: {
    type: Schema.Types.ObjectId,
    ref: "Review",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//make sure a user can review only one time
reviewSchema.index({ memory: 1, reviewer: 1 }, { unique: true });

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
