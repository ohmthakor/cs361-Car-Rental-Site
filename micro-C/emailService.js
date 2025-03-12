// micro-C/emailService.js
const nodemailer = require('nodemailer');

// Configure your email transport (for example, using a test account or a real service)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or 'Yahoo', etc.
  auth: {
    user: 'YOUR_EMAIL@gmail.com',
    pass: 'YOUR_EMAIL_PASSWORD'
  }
});

async function sendConfirmation(email, bookingDetails) {
  const mailOptions = {
    from: '"Car Rentals" <YOUR_EMAIL@gmail.com>',
    to: email,
    subject: 'Your Booking Confirmation',
    text: `Hello, your booking is confirmed! Details: ${JSON.stringify(bookingDetails)}`,
    // You could also use `html:` if you want a richer email body
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendConfirmation };
