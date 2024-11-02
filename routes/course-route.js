const express = require("express");
const router = express.Router();
const { validateToken, checkRole } = require('./../middleware/auth');
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    createOrder,
    getOrder,
    createPaymentConfirmation,
} = require('./../controllers/course-controller');

// middleware aliasing
const bearerVerify = validateToken;
const onlyAdmin = checkRole;

// routess
router.get('', getCourses);
router.get('/', getCourses);
router.get('/:slug', bearerVerify, getCourse)
router.post('/', bearerVerify, onlyAdmin, createCourse);
router.put('/:slug', bearerVerify, onlyAdmin, updateCourse);
router.delete('/:slug', bearerVerify, onlyAdmin, deleteCourse);

// order and payments
router.post('/:slug/order', bearerVerify, createOrder);
router.get("/:slug/order/:orderId", bearerVerify, getOrder);
router.post('/:slug/order/:orderId/confirm', bearerVerify, createPaymentConfirmation);

module.exports = router;