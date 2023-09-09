const express = require("express");
const {
  getTimeTable,
  postTimeTable,
  updateStatus,
} = require("../controllers/TimeTable");
const router = express.Router();

router.route("/").get(getTimeTable).post(postTimeTable).patch(updateStatus);

module.exports = router;
