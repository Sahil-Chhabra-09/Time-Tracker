const mongoose = require("mongoose");

const TTSchema = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    required: true,
  },
  tt: {
    type: String,
    required: true,
    min: 10,
  },
  status: {
    type: Array,
    default: [],
  },
});

const TimeTable = mongoose.model("TimeTable", TTSchema);

module.exports = TimeTable;
