const Message = require("../models/Message");

// To add a message for a specific user
const addMessage = async (req, res) => {
  const newMesssage = new Message({
    subject: req.body.subject,
    content: req.body.content,
    userId: req.body.userId,
  });

  try {
    const message = await newMesssage.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
};

// To get the count of total messages and unread messages for a specific user
const getMessageCount = async (req, res) => {
  try {
    const messagesCount = await Message.where({
      userId: req.params.userId,
    }).countDocuments();
    const messagesUnreadCount = await Message.where({
      isRead: false,
      userId: req.params.userId,
    }).countDocuments();

    const count = {
      total: messagesCount,
      unread: messagesUnreadCount,
    };
    res.status(200).json(count);
  } catch (err) {
    res.status(500).json(err);
  }
};

// To get all the messages for a specific user
const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId }).sort({
      _id: -1,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

// To get a specific message
const getMessageById = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id).where({
      userId: req.params.userId,
    });

    if (!message) {
      res.status(404).json({ message: "Message not found" });
    } else {
      res.status(200).json(message);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// To update the read status of a specific message
const updateMessageReadStatus = async (req, res) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      {
        userId: req.params.userId,
        _id: req.params.id,
      },
      {
        $set: { isRead: req.body.isRead },
      },
      { new: true }
    );

    if (!updatedMessage) {
      res.status(404).json({ message: "Message not found, update failed" });
    } else {
      res.status(200).json(updatedMessage);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const messageController = {
  addMessage,
  getMessageCount,
  getMessages,
  getMessageById,
  updateMessageReadStatus,
};

module.exports = messageController;
