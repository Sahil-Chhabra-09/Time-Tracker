const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    default: 0,
  },
  started: {
    type: Boolean,
    default: false,
  },
  totalTime: {
    type: Number,
    default: 0,
  },
});

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
