'use strict';
const nodemailer = require('nodemailer');

const sendEmail = (email, user, community, status) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `dwellplayd@gmail.com`,
      pass: `dw3llplayd`
    }
  });

  // setup email data with unicode symbols
  let signup = {
    from: '"dwellplayd" `dwellplayd@gmail.com', // sender address
    to: email, // list of receivers
    subject: `Thanks for joining!`, // Subject line
    text: `Hey ${user.firstName}! Thanks for joining dwellplayd. Get ready to have some fun doing not fun stuff`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  };
  let invite = {
    from: '"dwellplayd" `dwellplayd@gmail.com', // sender address
    to: email, // list of receivers
    subject: `You've been invited!`, // Subject line
    text: `Hey there! ${user.firstName} ${user.lastName} has invited you to join ${community.name} on dwellplayd.  You should go here and sign up!`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  };

  const actions = {
    signup: signup,
    invite: invite,
  }

  const action = actions[status]
  
  transporter.sendMail(action, (error, info) => {
    console.log(email, action)
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}

module.exports = sendEmail
