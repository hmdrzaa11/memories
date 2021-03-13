let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let memorySchema = new Schema({
  title: {
    type: String,
    required: [true, "title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "description is required"],
    trim: true,
  },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "the author is required"],
  },
  image: {
    type: String,
    default: "default.jpg",
  },
  ratingsAvg: {
    type: Number,
    min: [0, "ratings can not be lower than 0"],
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

memorySchema.pre(/^find/, function (next) {
  this.populate({
    path: "author",
    select: "-__v -password -role -passwordChangedAt",
  });
  next();
});

let Memory = mongoose.model("Memory", memorySchema);

module.exports = Memory;
