function transformCoursesResponse(courses) {
    return courses.map(course => {
        return transformCourseResponse(course);
    });
}

function transformCourseResponse(course) {
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
        total_student: course.totalParticipants ? course.totalParticipants.toString() : "",
        portofolio: course.portfolio || [],
        price: course.fee.toString(),
        materi: course.materials || '', 
        about: course.short_description || '',
        mentor: course.mentor_name || '',
        location: course.city_name || '',
        headline_img: course.cover_image_url || '',
        image_mentor: course.mentor_image_url || '',
        slug: course.slug,
        id: course.slug,
    };
}

module.exports = {
    transformCourseResponse,
    transformCoursesResponse,
}