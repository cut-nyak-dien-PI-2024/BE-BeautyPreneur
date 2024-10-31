const mongoose = require("mongoose");

const otpCodeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    otp:{
        type:String,
        required:[true, "otp code harus diisi"]
    },
    validUntil:{
        type:Date,
        required:true,
        expires:3000
    }
})

const Otp = mongoose.model("otpcodes", otpCodeSchema);
module.exports = Otp;