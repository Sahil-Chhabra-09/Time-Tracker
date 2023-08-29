const State = require("../models/State");

{
  /* CREATE */
}
const saveTime = async (req, res) => {
  try {
    const { uid } = req.body;
    const timeData = await State.findOne({ uid: uid });
    if (timeData) {
      return res.status(200).json({
        msg: "State data already exists",
      });
    }
    const createdTime = await State.create({ uid });
    res.status(201).json({
      msg: "State Info created successfully",
      createdTime: createdTime,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

{
  /* READ */
}
const getTime = async (req, res) => {
  try {
    const { uid } = req.query;
    const timeData = await State.findOne({ uid: uid });
    if (!timeData) {
      return res.status(400).json({ msg: "No State data exists" });
    }
    res.status(200).json({ timeData: timeData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
{
  /* UPDATE */
}

const updateTime = async (req, res) => {
  try {
    const { startTime, started, totalTime, uid } = req.body;
    const updatedTime = await State.findOneAndUpdate(
      { uid: uid },
      { startTime: startTime, started: started, totalTime: totalTime },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Updated successfully", updatedTime: updatedTime });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { saveTime, getTime, updateTime };
