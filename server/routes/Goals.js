const express = require("express");
const router = express.Router();
const { addGoal, getGoals, removeGoal } = require("../controllers/Goals");

/* Creating/Reading Goal */
router.route("/").post(addGoal).get(getGoals).delete(removeGoal);

module.exports = router;
