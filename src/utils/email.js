// email.js

import nodemailer from 'nodemailer';

const sendOTPByEmail = (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your_email@gmail.com',
      pass: 'your_email_password',
    },
  });
  const mailOptions = {
    from: 'your_email@gmail.com',
    to: email,
    subject: 'OTP for password reset',
    text: `Your OTP for password reset is: ${otp}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

export { sendOTPByEmail }; 
