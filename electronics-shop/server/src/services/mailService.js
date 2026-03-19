import nodemailer from "nodemailer";
import { env } from "../config/env.js";
import { db } from "../db/index.js";

const hasSmtp = env.smtp.host && env.smtp.user && env.smtp.pass;

const transporter = hasSmtp
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: false,
      auth: {
        user: env.smtp.user,
        pass: env.smtp.pass
      }
    })
  : null;

export const sendMail = async ({ kind, recipient, subject, html }) => {
  let transport = "mock";

  if (transporter) {
    await transporter.sendMail({
      from: env.smtp.from,
      to: recipient,
      subject,
      html
    });
    transport = "smtp";
  }

  db.prepare(`
    INSERT INTO email_logs (kind, recipient, subject, content, transport)
    VALUES (?, ?, ?, ?, ?)
  `).run(kind, recipient, subject, html, transport);

  return { transport };
};
