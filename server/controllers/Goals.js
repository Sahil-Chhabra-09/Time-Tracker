const Goals = require("../models/Goals");

/* CREATE */
const addGoal = async (req, res) => {
  try {
    const { tag, uid, time } = req.body;
    await Goals.findOneAndDelete({ tag: tag, uid: uid });
    await Goals.create({ tag: tag, uid: uid, reqTime: time });
    return res.status(201).send("Goal created successfully");
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Couldn't add goal", error: error.msg });
  }
};

/* READ */
const getGoals = async (req, res) => {
  try {
    const { uid } = req.query;
    const goals = await Goals.find({ uid: String(uid) });
    res.status(200).json({ success: true, goals: goals });
  } catch (error) {
    res.status(500).json({ msg: "Couldn't get goals", error: error.msg });
  }
};

/* UPDATE */
// const markAsCompleted = async (req, res) => {
//   try {
//     const { uid, id } = req.query;
//     const goals = await Goals.findOneAndUpdate(
//       { _id: id, uid: String(uid) },
//       { completed: true }
//     );
//     res.status(200).json({ success: true, goals: goals });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: "Couldn't mark as completed", error: error.msg });
//   }
// };

/* DELETE */
const removeGoal = async (req, res) => {
  try {
    const { tag_id, uid } = req.query;
    const tag = await Goals.findByIdAndDelete(tag_id);
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }
    const goals = await Goals.find({ uid: String(uid) });
    res.status(200).json({
      success: true,
      message: "Tag removed successfully",
      goals: { goals },
    });
  } catch (error) {
    res.status(500).json({ msg: "Couldn't remove tag", error: error.msg });
  }
};

module.exports = { addGoal, getGoals, removeGoal };
