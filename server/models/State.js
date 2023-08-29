const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
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

const State = mongoose.model("State", stateSchema);

module.exports = State;
