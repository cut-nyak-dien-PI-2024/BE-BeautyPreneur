const Course = require("./../models/Course");
const Order = require("./../models/Order");
const OrderPaymentConfirmation = require("./../models/OrderPaymentConfirmation");
const slugify = require('slugify');


function resp(res, httpStatus, data) {
    return res.status(httpStatus).json({
        code: httpStatus,
        status: httpStatus >= 200,
        data: data || {}
    });
}

function transformCoursesResponse(courses) {
    return courses.map(course => {
        return {
            title: course.name,
            desc: course.description,
            level: course.level.toLowerCase(),
            duration: {
                date: course.start_time.toISOString().split('T')[0],
                hour: [course.start_time.getHours(), course.start_time.getMinutes()]
                    .map(x => x < 10 ? "0" + x : x)
                    .join(":"),
            },
            total_student: course.totalParticipants.toString(),
            portofolio: course.portfolio || [],
            price: course.fee.toString(),
            materi: course.materials, 
            about: course.short_description,
            mentor: course.mentor_name,
            location: course.city_name.toLowerCase(),
            headline_img: course.cover_image_url,
            image_mentor: course.mentor_image_url,
            slug: course.slug,
            id: course.slug,
        };
    });
}

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

            return resp(res, 201, course, '');
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
            courseWithParticipants.total_participants = totalParticipants;

            return res.status(200).json(courseWithParticipants);
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
            return res.status(200).json(updatedCourse);
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
