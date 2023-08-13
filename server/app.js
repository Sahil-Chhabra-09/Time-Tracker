const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

const port = process.env.PORT || 3001;
const connectDb = require("./db/connect");
const authRouter = require("./routes/register");
const morgan = require("morgan");
const timeRouter = require("./routes/time");

app.use(express.json());
app.use(cors());
app.use(morgan("common"));

app.use("/auth", authRouter);
app.use("/time", timeRouter);

app.get("/", (req, res) => {
  res.status(200).json({ ping: "pong" });
});
app.get("*", (req, res) => {
  res.status(404).send("Page you requested doesn't exist :(");
});

const start = async () => {
  try {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, (req, res) => {
      console.log("Server listening on port:", port);
    });
  } catch (error) {
    console.log({
      msg: "Error occured while kickstarting backend",
      error: error,
    });
  }
};

start();
