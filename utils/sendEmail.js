const nodemailer = require("nodemailer");
const mailerConfig = require("./mailerConfig");

const sendEmail =  async({to, subject, html}) => {
    const transporter = nodemailer.createTransport(mailerConfig);

    return transporter.sendMail({
        from:'beauty preneur',
        to,
        subject,
        html
    })
}

module.exports = sendEmail;

