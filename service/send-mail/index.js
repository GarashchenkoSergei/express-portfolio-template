const nodemailer = require('nodemailer')
const config = require('../../config.json')

const sendMail = (data) => {
  const {name, email, message} = data

  if (!name || !email || !message) {
    throw new Error('Please fill all fields')
  }

  const transporter = nodemailer.createTransport(config.mail.smtp)
    const mailOptions = {
    from: `"${name}" <${email}>`,
    to: config.mail.smtp.auth.user,
    subject: config.mail.subject,
    text:
      message.trim().slice(0, 500) + `\n Отправлено с: <${email}>`
  }

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      throw new Error('Something went wrong')
    }

    return 'Message was sent successfully'
  })
}

module.exports = {
  sendMail
}
