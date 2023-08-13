const express = require("express");
const timeRouter = express.Router();
const { saveTime, getTime, updateTime } = require("../controllers/timeData");

timeRouter.route("/").get(getTime).post(saveTime).patch(updateTime);

module.exports = timeRouter;
