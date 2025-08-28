import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

async function main() {
  console.log("🔎 Using SMTP:", {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
  });

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // must be false for 587
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.verify();
    console.log("✅ Gmail connection verified");

    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_USER, // send to yourself
      subject: "Test Email from PiTetris",
      text: "If you see this, Gmail SMTP works 🎉",
    });

    console.log("📧 Message sent:", info.messageId);
  } catch (err) {
    console.error("❌ Mail test failed:", err);
  }
}

main();
