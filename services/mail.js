const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rwa3.jyoti.sj@gmail.com",
        pass: "gcir obrw ebqg zzaz"
    }
})

const sendMail = async (to, otp, subject, html) => {
    const mailOption = {
        from: "rwa3.jyoti.sj@gmail.com",
        to: to,
        subject: subject,
        html: html
    }
    await transporter.sendMail(mailOption, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(info);
        }
    })
}



module.exports = sendMail