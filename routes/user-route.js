const express = require("express");
const { getAllUsers, getUserById, addUser, editUserById, deleteUserById, deleteAllUser } = require("../controllers/user-controller");
const { validateToken, checkRole } = require("../middleware/auth");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", validateToken, checkRole, addUser);
router.put("/:id", validateToken, checkRole, editUserById);
router.delete("/:id", validateToken, checkRole, deleteUserById);
router.delete("/", validateToken, checkRole, deleteAllUser);

module.exports = router;