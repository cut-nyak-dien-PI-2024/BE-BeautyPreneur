const express = require("express");
const { register, login, currentUser, verifyEmail, forgotPassword, resetPassword } = require("../controllers/auth-controller");
const { validateToken } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/currentUser", validateToken, currentUser);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router; 