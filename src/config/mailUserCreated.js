const welcome = require("../helpers/mailUserCreatedHTML");
const transporter = require("./nodemailer")


const mailUserCreated = async (email) => {
    const welcomeHtml = welcome()
    await transporter.sendMail({
      from: "mensaje enviado por <lucas.soldierty@gmail.com>",
      to: email,
      subject: "Bienvenido",
      html: welcomeHtml
    })
}

module.exports = mailUserCreated;