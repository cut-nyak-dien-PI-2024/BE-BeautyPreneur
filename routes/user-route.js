const express = require("express");
const { getAllUsers, getUserById, addUser, editUserById, deleteUserById, deleteAllUser } = require("../controllers/user-controller");

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", editUserById);
router.delete("/:id", deleteUserById);
router.delete("/", deleteAllUser);

module.exports = router;