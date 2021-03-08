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
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

let Memory = mongoose.model("Memory", memorySchema);

module.exports = Memory;
