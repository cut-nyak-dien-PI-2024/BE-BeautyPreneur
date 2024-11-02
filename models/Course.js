const mongoose = require("mongoose");

const [
    LEVEL_BEGINNER,
    LEVEL_INTERMEDIATE,
    LEVEL_ADVANCED,  
    LEVEL_EXPERT,
] = ["Pemula", "Menengah", "Mahir", "Ahli"];

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "nama harus diisi"],
    },

    slug: {
        type: String
    },

    short_description: {
        type: String,
        required: [true, "deskripsi pendek harus diisi"]
    },

    description: {
        type: String,
        required: [true, "deskripsi harus diisi"]
    },

    materials: {
        type: String,
        required: [true, "materials harus diisi"]
    },

    cover_image_url: {
        type: String
    },

    level: {
        type: String,
        required: [true, "level harus diisi"],
        enum: [LEVEL_BEGINNER, LEVEL_INTERMEDIATE, LEVEL_ADVANCED, LEVEL_EXPERT],
        default: LEVEL_BEGINNER
    },

    mentor_name: {
        type: String,
        required: [true, "nama mentor harus diisi"]
    },

    mentor_image_url: {
        type: String
    },

    city_name: {
        type: String,
        required: [true, "nama kota harus diisi"]
    },

    location_address: {
        type: String,
        required: [true, "alamat harus diisi"]
    },

    location_latitude: {
        type: Number,
        required: [true, "latitude harus diisi"]
    },

    location_longitude: {
        type: Number,
        required: [true, "longitude harus diisi"]
    },

    start_time: {
        type: Date,
        required: [true, "waktu mulai harus diisi"]
    },

    end_time: {
        type: Date,
        required: [true, "waktu selesai harus diisi"]
    },

    currency: {
        type: String,
        required: [true, "currency harus diisi"]
    },

    fee: {
        type: Number,
        required: [true, "fee harus diisi"]
    },

    max_participants: {
        type: Number,
        required: [true, "maksimum partisipan harus diisi"]
    },

    portfolio: [{
        name: {
            type: String,
            required: [true, "nama proyek harus diisi"]
        },
        
        image_url: {
            type: String,
            required: [true, "gambar harus diisi"]
        }
    }]
}, { timestamp: true });

courseSchema.statics.getCourses = async function({ keyword, fg_level, city_name, page = 1, perPage = 10 }) {
    const query = {};
    
    if (fg_level) query.fg_level = fg_level;
    if (city_name) query.city_name = city_name;
    if (keyword && keyword.length >= 2) {
        query.$or = [
            { name: { $regex: keyword, $options: 'i' } },
            { description: { $regex: keyword, $options: 'i' } },
            { short_description: { $regex: keyword, $options: 'i' } },
            { materials: { $regex: keyword, $options: 'i' } }
        ];
    }

    const options = {
        skip: (page - 1) * perPage,
        limit: perPage,
    };

    const courses = await this.find(query, null, options);
    return courses;
};

courseSchema.method({
});

const Course = mongoose.model("Course", courseSchema);
module.exports = Course;
