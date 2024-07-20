import { createTransport } from 'nodemailer';
// Configurar o transporte do nodemailer
const { EMAIL_USER: user,
  EMAIL_PASS: pass } = process.env;

const transporter = createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: user,
    pass: pass
  }
});

// Função para enviar e-mail
export default function sendMail(to: string, subject: string, html: string) {
  return transporter.sendMail({
    from: user,
    to,
    subject,
    html
  });
};
