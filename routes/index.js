const express = require("express");
const router = express.Router();

router.get("/todos", (req, res) => {
    res.json({
        message:"selamat datang di dev routesss"
    })
})


module.exports = router;
