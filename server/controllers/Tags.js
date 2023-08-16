const Tags = require("../models/Tags");

const addTag = async (req, res) => {
  try {
    const { tag, uid, time } = req.body;
    const existingTag = await Tags.findOne({ tag: tag });
    if (!existingTag) {
      await Tags.create({ tag: tag, uid: uid, time: time });
      return res.status(201).send("Tagged Successfully");
    }
    await Tags.findOneAndUpdate(
      { tag: tag },
      { time: existingTag.time + time }
    );
    return res.status(201).send("Tagged Updated Successfully");
  } catch (error) {
    res.status(500).json({ msg: "Couldn't add tag", error: error.msg });
  }
};

const getTags = async (req, res) => {
  try {
    const { uid } = req.query;
    const tags = await Tags.find({ uid: String(uid) });
    console.log(tags);
    res.status(200).json({ success: true, tags: tags });
  } catch (error) {
    res.status(500).json({ msg: "Couldn't add tag", error: error.msg });
  }
};

module.exports = { addTag, getTags };
