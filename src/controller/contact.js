const transporter = require("../services/nodemailer/mailer");
require('dotenv').config();

module.exports = {

    create: async (req, res) => {
        const name = req.body.name;
        const email = req.body.email;
        const message = req.body.message;

        let mailOptions = {
            from: `Rajeev <${process.env.MAILER_USER}>`,
            to: email,
            subject: "Happy to see you.",
            html: `<html>
                      <head>
                        <style>
                          /* Add some styling to make the email look nice */
                          body {
                            font-family: Arial, sans-serif;
                            background-color: #f8f8f8;
                            padding: 20px;
                          }
                          h1 {
                            color: #003366;
                            text-align: center;
                          }
                          p {
                            font-size: 16px;
                            line-height: 1.5;
                            margin-bottom: 20px;
                          }
                          .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 20px;
                            border-radius: 10px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                          }
                          .btn {
                            background-color: #003366;
                            color: #fff;
                            padding: 12px 20px;
                            border-radius: 25px;
                            text-decoration: none;
                            margin-top: 20px;
                            display: inline-block;
                            fon
                          }
                        </style>
                      </head>
                      <body>
                        <div class="container">
                          <h1>Thank you for reaching out to me.</h1>
                          <p>I appreciate your interest in my services and products. I have received your message and will get back to you as soon as possible. </p>
                          <p>If you need immediate assistance, please call me at +94768021017 / +94713080226.</p>
                          <a href="https://softc.vercel.app/" target="_blank" class="btn text-white" style="font-size: 16px">Visit our website</a>
                        </div>
                      </body>
                    </html>`,
          };

          let ackMailOptions = {
            from: `SOFTC <${process.env.MAILER_USER}>`,
            to: process.env.MAILER_USER,
            subject: "Received a mail from portfolio",
            html: `<html> 
                <body>
                    <p>Name : ${name}</p>
                    <p>Email : ${email}</p>
                    <p>Message : ${message}</p>
                </body>
            </html>`
          }

          let mailArray = [mailOptions, ackMailOptions]

          mailArray.forEach(mailOptions => {
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                res.send({ 
                    response: "error", 
                    message: "Sorry can't able to send email at the moment. Please try again later.", 
                    email_sent: false 
                });
              } else {
                res.send({
                    response: "success",
                    message:"Your information has been received, and I'll be in touch soon.",
                    email_sent: true,
                });
              }
            });
          });
  
    }
}