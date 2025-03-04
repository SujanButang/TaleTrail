import { createTransport } from "nodemailer";

/**
 * Send verification email to the provided email address
 * @param params
 */
export const sendMail = (params: { email: string; otp: number }) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  const mailOptions = {
    from: "tale.trail.site@gmail.com",
    to: params.email,
    subject: "Email Verification",
    html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification Code</title>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f4f4f4;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
            }
            .content {
              margin-top: 20px;
            }
            .verification-code {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              color: #555555;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Email Verification Code</h2>
            </div>
            <div class="content">
              <p>Dear User,</p>
              <p>Your email verification code is:</p>
              <p class="verification-code">${params.otp}</p>
            </div>
            <div class="footer">
              <p>Thank you for using our service.</p>
            </div>
          </div>
        </body>
        </html>
        `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};
