const express = require("express");
const router = express.Router();
const { validateToken, checkRole } = require('./../middleware/auth');
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,

} = require('./../controllers/course-controller');

const {
    createOrder,
    getOrder,
    createPaymentConfirmation,
    updateOrderStatus,
} = require('./../controllers/order-controller');

// middleware aliasing
const bearerVerify = validateToken;
const onlyAdmin = checkRole;

// routes
router.get('', getCourses);
router.get('/', getCourses);
router.get('/:slug', bearerVerify, getCourse)
router.post('/', bearerVerify, onlyAdmin, createCourse);
router.put('/:slug', bearerVerify, onlyAdmin, updateCourse);
router.delete('/:slug', bearerVerify, onlyAdmin, deleteCourse);

// orders
router.post('/:slug/order', bearerVerify, createOrder);
router.get('/:slug/order/:orderId', bearerVerify, getOrder);
router.put('/:slug/order/:orderId/status', bearerVerify, onlyAdmin, updateOrderStatus);

// payment confirmation
router.post('/:slug/order/:orderId/confirm', bearerVerify, createPaymentConfirmation);

module.exports = router;