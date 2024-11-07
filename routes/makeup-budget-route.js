const express = require("express");
const { getAllData, addData, editDataById, deleteDataById, deleteAllData, getDataById, sendAllData, sendMakeupPackage, getAllDataFromMakeupPackage } = require("../controllers/makeup-budget-controller");
const { validateToken, checkRole } = require("../middleware/auth");
const router  = express.Router();

//route for data of makeup packages
router.post("/insert-all-data", sendAllData);
router.get("/", getAllData);
router.get("/:id", getDataById);
router.post("/", validateToken, checkRole, addData);
router.put("/:id", validateToken, checkRole, editDataById);
router.delete("/:id", validateToken, checkRole, deleteDataById);
router.delete("/", validateToken, checkRole, deleteAllData);


module.exports = router;
