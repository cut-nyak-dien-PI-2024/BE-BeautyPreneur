const express = require("express");
const router = express.Router();
const { validateToken } = require('./../middleware/auth');

const {
    getOrders,
} = require('./../controllers/order-controller');

// middleware aliasing
const bearerVerify = validateToken;

// orders
router.get('', bearerVerify, getOrders);
router.get('/', bearerVerify, getOrders);

module.exports = router;