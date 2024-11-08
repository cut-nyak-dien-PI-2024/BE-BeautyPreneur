const express = require("express");
const router = express.Router();

const userRoute = require("./user-route");
const authRoute = require("./auth-route");
const courseRoute = require("./course-route");
const orderRoute = require("./order-route");
const makeupBudgetRoute = require("./makeup-budget-route");
const makeupPackageRoute = require("./makeup-package-route");

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/makeup-budget", makeupBudgetRoute);
router.use("/makeup-package", makeupPackageRoute);
router.use("/courses", courseRoute);
router.use("/orders", orderRoute);

module.exports = router;
