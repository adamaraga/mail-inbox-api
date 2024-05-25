const router = require("express").Router();
const Message = require("../models/Message");

// To add a message for a specific user
router.post("/add", async (req, res) => {
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
});

// To get the count of total messages and unread messages for a specific user
router.get("/count/:userId", async (req, res) => {
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
});

// To get all the messages for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const messages = await Message.find({ userId: req.params.userId }).sort({
      _id: -1,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// To get a specific message
router.get("/:id/:userId", async (req, res) => {
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
});

// To update the read status of a specific message
router.put("/read-update/:id/:userId", async (req, res) => {
  try {
    const updatedMessage = await Message.findOneAndUpdate(
      {
        userId: req.params.userId,
        _id: req.params.id,
      },
      {
        $set: req.body,
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
});

module.exports = router;
