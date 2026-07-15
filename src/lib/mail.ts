import nodemailer from 'nodemailer';

if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
  throw new Error('SMTP environment variables are missing');
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendOtpEmail(to: string, otp: string) {
  const mailOptions = {
    from: `"Piper Chess Club Admin" <${process.env.SMTP_USER}>`,
    to,
    subject: 'Your Admin Panel OTP Code',
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; text-align: center;">Piper Chess Club Admin Login</h2>
        <p style="font-size: 16px; color: #555;">You are attempting to log into the Admin Panel.</p>
        <p style="font-size: 16px; color: #555;">Your One-Time Password (OTP) is:</p>
        <div style="text-align: center; margin: 30px 0;">
          <span style="font-size: 32px; font-weight: bold; background: #f4f4f4; padding: 10px 20px; border-radius: 8px; letter-spacing: 4px;">${otp}</span>
        </div>
        <p style="font-size: 14px; color: #888;">This code will expire in 5 minutes. Do not share it with anyone.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
