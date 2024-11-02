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

// middleware aliasing
const bearerVerify = validateToken;
const onlyAdmin = checkRole;

// routes
router.get('/', getCourses);
router.post('/', bearerVerify, onlyAdmin, createCourse);
router.get('/:slug', bearerVerify, getCourse)
router.put('/:slug', bearerVerify, onlyAdmin, updateCourse);
router.delete('/:slug', bearerVerify, onlyAdmin, deleteCourse);

module.exports = router;