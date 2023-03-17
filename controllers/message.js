const Message = require("../models/Message");

exports.postMessage = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const newMessage = new Message({ name, email, phone, message });
    await newMessage.save();
    res.status(200).send({ msg: "message sent successfully", newMessage });
  } catch (error) {
    res.status(400).send({ msg: "cannot send message!!!", error });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const listMessages = await Message.find();
    res.status(200).send({ msg: "Messages", listMessages });
  } catch (error) {
    res.status(400).send({ msg: "cannot get all Messages", error });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { _id } = req.params;
    await Message.findOneAndDelete({ _id });
    res.status(200).send({ msg: "Messages deleted" });
  } catch (error) {
    res.status(400).send({ msg: "cannot delete this Messages", error });
  }
};
