const mongoose = require("mongoose");

const Goal_Schema = new mongoose.Schema({
  tag: {
    type: String,
    min: 2,
    max: 20,
    required: true,
  },
  uid: {
    type: String,
    required: true,
  },
  reqTime: {
    type: Number,
    required: true,
  },
  time: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Goals = mongoose.model("Goals", Goal_Schema);

module.exports = Goals;
