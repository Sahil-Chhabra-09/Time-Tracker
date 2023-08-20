const Tags = require("../models/Tags");

/* CREATE */
const addTag = async (req, res) => {
  try {
    const { tag, uid, time } = req.body;
    const existingTag = await Tags.findOne({ tag: tag, uid: uid });
    if (!existingTag) {
      await Tags.create({ tag: tag, uid: uid, time: time });
      return res.status(201).send("Tagged Successfully");
    }
    await Tags.findOneAndUpdate(
      { tag: tag, uid: uid },
      { time: existingTag.time + time }
    );
    return res.status(201).send("Tagged Updated Successfully");
  } catch (error) {
    res.status(500).json({ msg: "Couldn't add tag", error: error.msg });
  }
};

/* READ */
const getTags = async (req, res) => {
  try {
    const { uid } = req.query;
    const tags = await Tags.find({ uid: String(uid) });
    res.status(200).json({ success: true, tags: tags });
  } catch (error) {
    res.status(500).json({ msg: "Couldn't add tag", error: error.msg });
  }
};

/* DELETE */
const removeTag = async (req, res) => {
  try {
    const { tag_id, uid } = req.query;
    const tag = await Tags.findByIdAndDelete(tag_id);
    if (!tag) {
      return res.status(404).json({ success: false, message: "Tag not found" });
    }
    const tags = await Tags.find({ uid: String(uid) });
    res.status(200).json({
      success: true,
      message: "Tag removed successfully",
      tags: { tags },
    });
  } catch (error) {
    res.status(500).json({ msg: "Couldn't remove tag", error: error.msg });
  }
};

module.exports = { addTag, getTags, removeTag };
