const nodemailer = require('nodemailer')
const {EMAIL_USER, EMAIL_PASS} = process.env

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
})

transporter.verify()
.then(() => console.log("gmail enviado con exito"))
.catch((error) => console.error(error))

module.exports = transporter;