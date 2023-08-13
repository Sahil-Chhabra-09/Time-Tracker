const Time = require("../models/time");

{
  /* CREATE */
}
const saveTime = async (req, res) => {
  try {
    const { uid } = req.body;
    const timeData = await Time.findOne({ uid: uid });
    if (timeData) {
      return res.status(200).json({
        msg: "Time data already exists",
      });
    }
    const createdTime = await Time.create({ uid });
    res.status(201).json({
      msg: "Time Info created successfully",
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
    console.log({ uid });
    const timeData = await Time.findOne({ uid: uid });
    if (!timeData) {
      return res.status(400).json({ msg: "No time data exists" });
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
    const updatedTime = await Time.findOneAndUpdate(
      { uid: uid },
      { startTime: startTime, started: started, totalTime: totalTime },
      { new: true }
    );
    res
      .status(200)
      .json({ msg: "Updated successfully", updatedTime: updatedTime });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { saveTime, getTime, updateTime };
