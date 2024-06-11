const express = require('express');
const cors = require('cors');

// Iniciando o express
const app = express();

// Conectando ao banco
const conn = require("./db/conn");

// Models
const Deficiencia = require("./models/deficiencia");
const Funcao = require("./models/funcao");
const MeioLocomocao = require("./models/meio_locomocao");
const Modalidade = require('./models/modalidade');
const PessoaFisica = require("./models/pessoa_fisica");
const Usuario = require("./models/usuario");

// Configurando resposta JSON
app.use(express.json());

// Resolve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Pasta para imagens
app.use(express.static('public'));

// Rotas
const RotaDeficiencia = require('./routes/DeficienciaRoutes');
const RotaUsuario = require('./routes/UsuarioRoutes');
const RotaPessoaFisica = require('./routes/PessoaFisicaRoutes');
const RotaMeioLocomocao = require('./routes/MeioLocomocaoRoutes');
const RotaModalidade = require('./routes/ModalidadeRoutes');
const RotaFuncao = require('./routes/FuncaoRoutes');

app.use('/home/cadastros/deficiencia', RotaDeficiencia);
app.use('/usuario', RotaUsuario);
app.use('/home/cadastros/associado', RotaPessoaFisica);
app.use('/home/cadastros/meio_locomocao', RotaMeioLocomocao);
app.use('/home/cadastros/modalidade', RotaModalidade);
app.use('/funcao', RotaFuncao);

// Definindo a porta que o backend vai rodar
conn
  .sync()
  //.sync({force: true}) // Apaga todas as tabelas e faz novamente
  .then(() => {
    app.listen(5000, () => {
      console.log('Servidor rodando na porta 5000');
    });
  })
  .catch((err) => console.log(err));