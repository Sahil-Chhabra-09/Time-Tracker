const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    if (!token) {
      return res.status(403).send("Access denied");
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (verified) {
      req.user = verified;
      return next();
    }
    res.status(403).send("Access denied");
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to verify token", error: error.message });
  }
};

module.exports = verifyToken;
