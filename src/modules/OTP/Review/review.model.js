const mongoose = require('mongoose');

const reviewSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    driverId: { type: Schema.Types.ObjectId, ref: "User" },
    comment: {type: String },
    rating: {type: Number,default: 0.0},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", reviewSchema);
