const express = require("express");
const { validateToken, checkRole } = require("../middleware/auth");
const { sendMakeupPackage, getAllDataFromMakeupPackage, getAllMakeupPackage, getDataMakeupPackageById, addDataMakeup, editDataMakeupById, deleteDataMakeupById, deleteAllDataMakeup } = require("../controllers/makeup-package-controller");
const router  = express.Router();

//route for makeup-packages
router.post(
  "/insert-data-makeup-packages",
  validateToken,
  checkRole,
  sendMakeupPackage
);
router.get("/get-product-makeup-package", getAllDataFromMakeupPackage);

router.get("/", getAllMakeupPackage);
router.get("/:id", getDataMakeupPackageById);
router.post("/", validateToken, checkRole, addDataMakeup);
router.put("/:id", validateToken, checkRole, editDataMakeupById);
router.delete("/:id", validateToken, checkRole, deleteDataMakeupById);
router.delete("/", validateToken, checkRole, deleteAllDataMakeup);



module.exports = router;
