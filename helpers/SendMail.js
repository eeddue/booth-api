const mailgun = require("mailgun-js");

const SendMail = async (receiver, subject, message) => {
  const mg = () =>
    mailgun({
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    });

  const data = {
    to: receiver,
    from: `BOOTH  <${process.env.SENDER}>`,
    subject,
    html: message,
  };

  mg()
    .messages()
    .send(data, (error, body) => {
      if (error) console.log(error);
      else console.log("Email sent");
    });
};

module.exports = SendMail;
