const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Create a Transporter (Using Gmail Service)
  // NOTE: You need an "App Password" from Google for this to work securely.
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS  // Your Gmail App Password
    },
  });

  // 2. Define Email Options
  const mailOptions = {
    from: `"Career Orbit Support" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // 3. Send Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;