const express = require("express");
const router = express.Router();

const userRoute = require("./user-route");
const authRoute = require("./auth-route");
const makeupBudgetRoute = require("./makeup-budget-route");

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/makeup-budget", makeupBudgetRoute);

module.exports = router;
