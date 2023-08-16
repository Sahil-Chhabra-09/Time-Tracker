const mongoose = require("mongoose");

const Tags_Schema = new mongoose.Schema({
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
  time: {
    type: Number,
    required: true,
  },
});

const Tags = mongoose.model("Tags", Tags_Schema);

module.exports = Tags;
