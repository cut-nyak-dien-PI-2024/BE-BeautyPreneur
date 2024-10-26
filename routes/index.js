const express = require("express");
const router = express.Router();

router.get("/todos", (req, res) => {
    res.json({
        message:"selamat datang"
    })
})


module.exports = router;
