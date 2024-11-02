const Course = require("./../models/Course");
const slugify = require('slugify');


module.exports = {
    async getCourses(req, res) {
        try {
            const getCoursesReq = {
                keyword: req.query.q,
                fg_level: req.query.fgLevel,
                city_name: req.query.cityName,
                page: req.query.page,
                perPage: req.query.perPage
            };

            const courses = await Course.getCourses(getCoursesReq);
            return res.status(200).json(courses);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async createCourse(req, res) {
        try {
            const { name, fg_level, city_name } = req.body;

            let baseSlug = slugify(`${name}-${fg_level}-${city_name}`, { lower: true });
            let uniqueSlug = baseSlug;
            let counter = 1;

            while (await Course.findOne({ slug: uniqueSlug })) {
                uniqueSlug = `${baseSlug}-${counter}`;
                counter++;
            }

            const courseData = { ...req.body, slug: uniqueSlug };
            const course = new Course(courseData);
            await course.save();

            return res.status(201).json(course);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async getCourse(req, res) {
        try {
            const course = await Course.findOne({ slug: req.params.slug });
            if (!course) return res.status(404).json({ message: "Course not found" });
            return res.status(200).json(course);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    async updateCourse(req, res) {
        try {
            const updatedCourse = await Course.findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedCourse) return res.status(404).json({ message: "Course not found" });
            return res.status(200).json(updatedCourse);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    },

    async deleteCourse(req, res) {
        try {
            const deletedCourse = await Course.findOneAndDelete({ slug: req.params.slug });
            if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
            return res.status(200).json({ message: "Course deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
};
