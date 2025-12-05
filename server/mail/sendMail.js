const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    secure: true,
    host:'smtp.gmail.com',
    port: 465,
    auth:
    {
        user:'saga200618@gmail.com',
        pass: 'qgpwyoprlcusxdwk'
    }
})



async function sendMail({ to, subject, text, html }) {
  if (!to) {
    console.warn("sendMail called without 'to'");
    return;
  }

  const from = 'QUEUEHIRE saga200618@gmail.com';

  const mailOptions = {
    from,
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("📧 Mail sent:", info.messageId);
  } catch (err) {
    console.error("❌ Error sending mail:", err);
  }
}
module.exports = { sendMail };