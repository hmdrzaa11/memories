let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let Memory = require("./Memory");

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

reviewSchema.statics.calculateRatingsAverage = async function (memId) {
  //"this" refers to the Model
  let stats = await this.aggregate([
    {
      $match: {
        memory: memId,
      },
    },
    {
      $group: {
        _id: null,
        ratingsAverage: { $avg: "$rating" },
      },
    },
  ]);
  let ratings = stats[0] ? stats[0].ratingsAverage : 4.5;
  await Memory.findOneAndUpdate({ _id: memId }, { ratingsAvg: ratings });
};
reviewSchema.post("save", async function () {
  let doc = this;
  await doc.constructor.calculateRatingsAverage(doc.memory);
});

reviewSchema.pre(/^findOneAnd/, async function (next) {
  let doc = await this.findOne();
  this.review = doc;
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  if (this.review) {
    //only if we successfully deleted a review
    await this.review.constructor.calculateRatingsAverage(this.review.memory);
  }
});

let Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
