require('dotenv').config();

const mailerConfig = {
    secure:true,
    host:'smtp.gmail.com',
    port:465,
    auth:{
        user:process.env.MAIL,
        pass:process.env.PASS_MAIL
    }
}

module.exports = mailerConfig;