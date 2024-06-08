const messageController = require("../controllers/message.controller");

const router = require("express").Router();

router.post("/add", messageController.addMessage);

router.get("/count/:userId", messageController.getMessageCount);

router.get("/user/:userId", messageController.getMessages);

router.get("/:id/:userId", messageController.getMessageById);

router.put(
  "/read-update/:id/:userId",
  messageController.updateMessageReadStatus
);

module.exports = router;
