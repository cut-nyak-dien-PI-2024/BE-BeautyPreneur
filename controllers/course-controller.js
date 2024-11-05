const Course = require("./../models/Course");
const Order = require("./../models/Order");
const OrderPaymentConfirmation = require("./../models/OrderPaymentConfirmation");
const slugify = require('slugify');
const { transformCourseResponse, transformCoursesResponse, resp } =  require("./../utils/transformCourse");



module.exports = {
    async getCourses(req, res) {
        try {
            const getCoursesReq = {
                keyword: req.query.q,
                level: req.query.level,
                city_name: req.query.cityName,
                page: req.query.page,
                perPage: req.query.perPage
            };

            const courses = await Course.getCourses(getCoursesReq);

            const participantsCounts = await Promise.all(courses.map(course => 
                course.getTotalParticipants()
            ));

            const coursesWithCounts = courses.map((course, index) => ({
                ...course.toObject(),
                totalParticipants: participantsCounts[index],
            }));

            return resp(res, 200, transformCoursesResponse(coursesWithCounts));
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async createCourse(req, res) {
        try {
            const { name, level, city_name } = req.body;

            let baseSlug = slugify(`${name}-${level}-${city_name}`, { lower: true });
            let uniqueSlug = baseSlug;
            let counter = 1;

            while (await Course.findOne({ slug: uniqueSlug })) {
                uniqueSlug = `${baseSlug}-${counter}`;
                counter++;
            }

            const courseData = { ...req.body, slug: uniqueSlug };
            const course = new Course(courseData);
            await course.save();

            return resp(res, 201, transformCoursesResponse([course]), '');
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async getCourse(req, res) {
        try {
            const course = await Course.findOne({ slug: req.params.slug });
            if (!course) return res.status(404).json({ message: "kursus tidak ditemukan" });

            const totalParticipants = await course.getTotalParticipants();
            const courseWithParticipants = course.toObject();
            courseWithParticipants.totalParticipants = totalParticipants;

            return res.status(200).json(transformCourseResponse(courseWithParticipants));
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    async updateCourse(req, res) {
        try {
            const updatedCourse = await Course.findOneAndUpdate(
                { slug: req.params.slug },
                req.body,
                { new: true, runValidators: true }
            );
            if (!updatedCourse) return res.status(404).json({ message: "kursus tidak ditemukan" });
            return res.status(200).json(transformCourseResponse(updatedCourse));
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    },

    async deleteCourse(req, res) {
        try {
            const deletedCourse = await Course.findOneAndDelete({ slug: req.params.slug });
            if (!deletedCourse) return res.status(404).json({ message: "kursus tidak ditemukan" });
            return res.status(200).json({ message: "kursus berhasil dihapus" });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
};
