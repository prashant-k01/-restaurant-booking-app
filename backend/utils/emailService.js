const nodemailer = require('nodemailer');
require('dotenv').config();

const sendConfirmationEmail = async (to, bookingDetails) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password if using Gmail
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Booking Confirmation',
    text: `Thank you for your booking!\n\nDetails:\nTable: ${bookingDetails.tableNumber}\nDate: ${bookingDetails.date}\nTime: ${bookingDetails.time}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendConfirmationEmail;
