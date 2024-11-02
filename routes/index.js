const express = require("express");
const router = express.Router();

const userRoute = require("./user-route");
const authRoute = require("./auth-route");
const courseRoute = require("./course-route");

router.use("/users", userRoute);
router.use("/auth", authRoute);
router.use("/courses", courseRoute);

module.exports = router;
