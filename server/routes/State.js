const express = require("express");
const stateRouter = express.Router();
const { saveTime, getTime, updateTime } = require("../controllers/stateData");

stateRouter.route("/").get(getTime).post(saveTime).patch(updateTime);

module.exports = stateRouter;
