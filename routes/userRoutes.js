const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUser,
  getMe,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

// POST /register
router.post("/register", createUser);

// POST /login
router.post("/login", loginUser);

//POST /me
router.get("/me", authMiddleware, getMe);

module.exports = router;
