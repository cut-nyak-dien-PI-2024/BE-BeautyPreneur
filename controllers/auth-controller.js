require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const OtpCode = require("../models/Otpcode");

module.exports = {
  register: async (req, res) => {
    try {
      const data = req.body;

      const isUserThere = await User.findOne({ email: data.email }).exec();
      if (isUserThere !== null) {
        return res.status(400).json({ message: "email sudah terdaftar" });
      }

      const newUser = new User(data);

      if (newUser?.password && newUser?.password?.length > 6) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newUser.password, salt);
        newUser.password = hash;
      }

      const otpData = await newUser.generateOtpCode();

      await newUser.save();

      await sendEmail({
        to: newUser.email,
        subject: `Hi ${newUser.name}, please verify your BeautyPreneur Account`,
        html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Registration Successful - Your OTP Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

            <div style="text-align: center; padding: 20px; background-color: #d63583;  color: #ffffff; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Registration Successful</h1>
            </div>

            <div style="padding: 20px; color: #333333; line-height: 1.6;">
              <p style="font-size: 16px;">Hello ${newUser.name},</p>
              <p style="font-size: 16px;">Terima kasih telah mendaftar! Akun Anda telah berhasil dibuat. Untuk menyelesaikan pendaftaran, silakan masukkan One-Time Password (OTP) berikut pada halaman verifikasi:</p>

              <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; padding: 10px 20px; background-color: #333333; color: #ffffff; font-size: 24px; font-weight: bold; border-radius: 4px;">${otpData.otp}</span>
              </div>

              <p style="font-size: 16px;">Kode ini akan kedaluwarsa dalam 5 menit. Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim kami.</p>
              <a href="[Support URL]" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #d63583;  color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; text-align: center;">Contact Support</a>
            </div>
            <div style="text-align: center; font-size: 12px; color: #777777; padding: 20px; border-top: 1px solid #dddddd;">
              <p style="margin: 0;">Jika Anda tidak mendaftar di website kami, abaikan email ini</p>
              <p style="margin: 0;">&copy; 2024 BeautyPreneur. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `,
      });

      res.status(201).json({
        message:
          "akun berhasil dibuat, silahkan cek email untuk verifikasi akun",
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  login: async (req, res) => {
    try {
      const data = req.body;

      const user = await User.findOne({ email: data.email }).exec();
      if (!user) {
        res.status(404).json({ message: "tidak ada email yang didaftarkan" });
        return;
      }

      const checkPassword = bcrypt.compareSync(data.password, user.password);
      if (!checkPassword) {
        res.status(401).json({ message: "password yang diberikan salah" });
        return;
      }

      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_KEY,
        { expiresIn: "10h" }
      );

      res.status(200).json({
        message: "berhasil login",
        access_token: token,
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  currentUser: async (req, res) => {
    const user = await User.findById(req.payload.id).select("-password");
    if (user) {
      return res.status(200).json({ user });
    } else {
      res.status(401).json({
        message: "user tidak ditemukan",
      });
    }
  },
  verifyEmail: async (req, res) => {
    try {
      if (!req.body.otp) {
        return res.status(400).json({
          message: "kode otp harus dimasukkan",
        });
      }

      const otp_code = await OtpCode.findOne({ otp: req.body.otp });

      if (!otp_code) {
        res.status(400).json({
          message: "kode otp tidak ditemukan",
        });
      }

      const userData = await User.findById(otp_code.user);

      await User.findByIdAndUpdate(userData._id, {
        isVerified: true,
        EmailVerifiedAt: Date.now(),
      });

      const deleteOTP = await OtpCode.findByIdAndDelete(otp_code._id);
      if (!deleteOTP) {
        res.status(404).json({
          message: "data tidak ditemukan",
        });
      }

      return res.status(200).json({
        message: "berhasil verifikasi akun",
      });
    } catch (err) {
      return res.status(500).json({ err });
    }
  },
  forgotPassword: async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "email tidak ditemukan",
      });
    }

    const otpData = await user.generateOtpCode();

    await sendEmail({
      to: user.email,
      subject: `Forgot password!`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Forgot password- Your OTP Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0;">

          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">

            <div style="text-align: center; padding: 20px; background-color: #d63583;  color: #ffffff; border-radius: 8px 8px 0 0;">
              <h1 style="margin: 0; font-size: 24px;">Forgot password</h1>
            </div>

            <div style="padding: 20px; color: #333333; line-height: 1.6;">
              <p style="font-size: 16px;">Hello ${user.name},</p>
              <p style="font-size: 16px;">Sepertinya anda melakukan permintaan untuk mengatur ulang password. Jika benar, silahkan klik masukkan kode otp berikut untuk mengatur ulang password anda.</p>

              <div style="text-align: center; margin: 20px 0;">
                <span style="display: inline-block; padding: 10px 20px; background-color: #333333; color: #ffffff; font-size: 24px; font-weight: bold; border-radius: 4px;">${otpData.otp}</span>
              </div>

              <p style="font-size: 16px;">Kode ini akan kedaluwarsa dalam 5 menit. Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi tim dukungan kami.</p>
              <a href="[Support URL]" style="display: inline-block; padding: 10px 20px; margin-top: 20px; background-color: #d63583;  color: #ffffff; text-decoration: none; border-radius: 4px; font-weight: bold; text-align: center;">Contact Support</a>
            </div>
            <div style="text-align: center; font-size: 12px; color: #777777; padding: 20px; border-top: 1px solid #dddddd;">
              <p style="margin: 0;">Jika Anda tidak merasa melakukan pengaturan ulang atau tidak ingin perubahan password, silahkan abaikan e-mail ini.</p>
              <p style="margin: 0;">&copy; 2024 BeautyPreneur. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
        `,
    });

    res.status(200).json({
      message: "silahkan cek email untuk verifikasi akun",
    });
  },
  resetPassword: async (req, res) => {
    const { otp, newpassword } = req.body;

    if (!newpassword) {
      return res
        .status(400)
        .json({ status: "error", message: "Password wajib diisi" });
    }

    const otpCode = await OtpCode.findOne({ otp });

    if (!otpCode) {
      res.status(400).json({
        message: "kode otp tidak ditemukan",
      });
    }

    const user = await User.findById({ _id: otpCode.user });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(newpassword, salt);
    user.password = hash;

    await user.save();

    res.status(200).json({
      message: "berhasil ganti password",
    });
  }
};
