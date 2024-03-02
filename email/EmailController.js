import { createTransport } from "nodemailer";

class EmailController {
  sendEmail = async (req, res) => {
    try {
      const { recipient, emailData } = req.body;

      const config = {
        host: "smtp.mail.ru",
        port: 465,
        secure: false,
        auth: {
          user: process.env.EMAIL_ADDRESS,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      };

      const transporter = createTransport(config);

      const sender = {
        address: process.env.EMAIL_ADDRESS,
      };

      const message = {
        from: sender.address,
        to: recipient.address,
        subject: emailData.subject,
        text: emailData.content,
      };

      await transporter.sendMail(message, (error, info) => {
        if (error) return res.status(500).send(error.message);
        else res.status(200).send(info.response);
      });
    } catch (err) {
      console.error(err);

      res.status(400).send("The email hasn't been sent");
    }
  };
}

export default new EmailController();
