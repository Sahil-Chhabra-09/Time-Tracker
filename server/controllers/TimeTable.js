const TimeTable = require("../models/TimeTable");

const getTimeTable = async (req, res) => {
  try {
    const { uid } = req.query;
    const myTable = await TimeTable.findOne({ uid: uid });
    if (!myTable) {
      return res.status(404).send("Time Table Not Found");
    }
    return res.status(200).json({ success: true, timeTable: myTable });
  } catch (error) {
    res
      .status(401)
      .send(`Error encountered while getting timetable ${error.message}`);
  }
};

const postTimeTable = async (req, res) => {
  try {
    const { uid, timeTable } = req.body;
    await TimeTable.findOneAndDelete({ uid: uid });
    const statusArray = Array.from(
      { length: timeTable.split(";").length },
      () => 0
    );
    await TimeTable.create({ uid: uid, tt: timeTable, status: statusArray });
    res.status(201).json({ success: true });
  } catch (error) {
    res
      .status(401)
      .send(`Error encountered while uploading timetable ${error.message}`);
  }
};

const updateStatus = async (req, res) => {
  try {
    const { uid, statusArray } = req.body;
    await TimeTable.findOneAndUpdate({ uid: uid }, { status: statusArray });
    res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(401)
      .send(`Error encountered while uploading timetable ${error.message}`);
  }
};

module.exports = { getTimeTable, postTimeTable, updateStatus };
