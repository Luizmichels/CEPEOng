import { createTransport } from 'nodemailer';

const { EMAIL_USER: user, EMAIL_PASS: pass, recipientEmail: to } = process.env;

const transporter = createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: user,
    pass: pass
  }
});

export function sendMail(subject: string, html: string) {
  return transporter.sendMail({
    from: user,
    to: to,
    subject,
    html
  });
};

export function sendMailTo(subject: string, html: string, to: string) {
  return transporter.sendMail({
    from: user,
    to: to,
    subject,
    html
  });
};