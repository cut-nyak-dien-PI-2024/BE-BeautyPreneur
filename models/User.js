const mongoose = require("mongoose");
const validator = require("validator");
const Otp = require("./Otp");
const RandomString = require("randomstring");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "email harus diisi"],
    validate: {
      validator: validator.isEmail,
      message: "input yang dimasukkan harus berformat email",
    },
  },
  password: {
    type: String,
    required: [true, "password harus diisi"],
    minlength: [6, "password harus minimal 6 karakter"],
  },
  name: {
    type: String,
    required: [true, "nama harus diisi"],
  },
  noTelephone: {
    type: Number,
    required: [true, "no telephone wajib diisi"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  EmailVerifiedAt: {
    type: Date,
  },
});

userSchema.method({
  generateOtpcode: async function () {
    const randomString = RandomString.generate({
      length: 5,
      charset: "numeric",
    });

    let currentDate = new Date();

    const otp = await Otp.findOneAndUpdate({
      'user':this._id
    }, {
      'otp':randomString,
      'validUntil':currentDate.setMinutes(currentDate.getMinutes() + 5)
    }, {
      new:true,
      upsert:true
    }
   )

    return otp;
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
