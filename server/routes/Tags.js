const express = require("express");
const router = express.Router();
const { addTag, getTags } = require("../controllers/Tags");
const verifyToken = require("../middleware/auth");

/* Creating/Reading Tag */
router.route("/").post(verifyToken, addTag).get(verifyToken, getTags);

module.exports = router;
