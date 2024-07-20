import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
// import sendMail from './mailer';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(json());

app.post('/sendEmail', async (req, res) => {
  const { nome, telefone, email } = req.body;

  const htmlContent = `
    <h2>Dados de Cadastro</h2>
    <p><strong>Nome:</strong> ${nome}</p>
    <p><strong>Telefone:</strong> ${telefone}</p>
    <p><strong>Email:</strong> ${email}</p>
  `;

  try {
    // await sendMail(email, 'Cadastro Realizado', htmlContent);
    res.status(200).send('Email enviado com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao enviar o email.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
