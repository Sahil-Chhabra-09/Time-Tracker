const mongoose = require("mongoose");

const connectDb = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to db successfully.");
    })
    .catch((error) => {
      console.log({
        msg: "Error occured while connecting to mongodb",
        error: error,
      });
    });
};

module.exports = connectDb;
