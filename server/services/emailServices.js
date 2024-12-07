import nodemailer from 'nodemailer';

// nodemailer object to send emails
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_APP_PASSWORD,
    }
  });


const sendPasswordResetEmail =  (email, resetToken) => {
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      to: email,
      subject: "Password Reset for your account",
      text: `Click the link below to reset your password`,
      html :`<a href="${process.env.CLIENT_URL}/resetpassword/${resetToken}">Reset Password</a>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
};

// const sendPasswordResetEmailTest =  (email, resetToken) => {
  
//   const mailOptions = {
//     to: email,
//     subject: "Password Reset for your account test",
//     text: `Click the link below to reset your password`,
//     html :`<a href="${process.env.CLIENT_URL}/resetpassword/${resetToken}">Reset Password</a>`
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email sent: ' + info.response);
//     }
//   });
// };

export {transporter, sendPasswordResetEmail};