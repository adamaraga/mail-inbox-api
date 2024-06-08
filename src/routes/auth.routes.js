const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.post("/register", authController.registerUser);

router.get("/:id", authController.getUser);

module.exports = router;
