import nodemailer from "nodemailer";
import constant from "../config/constant.js"


const sendMail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: constant.EMAIL_USER,
      pass: constant.EMAIL_PASS, 
    },
  });

  const info = await transporter.sendMail({
    from: '"Eventory Verification" <shristipokharel889@gmail.com>',
    to: email,
    subject: "Your One-Time Password (OTP) for Verification 🔐",
    text: `Hello,

Your One-Time Password (OTP) is: ${otp}

Please use this OTP to complete your verification process. 
This OTP is valid for 5 minutes.

If you did not request this, please ignore this message.

Thank you,
Eventory Team`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="color: #ff6600;">Eventory Verification</h2>
        <p>Hello,</p>
        <p>Your One-Time Password (otp) is:</p>
        <h1 style="background: #f0f0f0; padding: 10px; display: inline-block; border-radius: 6px;">${otp}</h1>
        <p>This OTP is valid for <strong>5 minutes</strong>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
        <br/>
        <p>Thanks,<br/>Eventory Team</p>
      </div>
    `,
  });

  console.log("Email sent:", info.response);
};
const email = 'ribeshraut@gmail.com'
const otp = 'k xaaa'


export{sendMail}
