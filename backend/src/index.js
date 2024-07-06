const express = require('express');
const cors = require('cors');
const conn = require("./db/conn");
const createDefaultAdminUser = require('./helpers/CriarUsarioAdim');

// Iniciando o express
const app = express();
console.log('Express initialized');

// Models
const Deficiencia = require("./models/deficiencia");
const Funcao = require("./models/funcao");
const MeioLocomocao = require("./models/meio_locomocao");
const Modalidade = require('./models/modalidade');
const PessoaFisica = require("./models/pessoa_fisica");
const Usuario = require("./models/usuario");

// Configurando resposta JSON
app.use(express.json());
console.log('JSON response configured');

// Resolve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
console.log('CORS configured');

// Pasta para imagens
app.use(express.static('public'));

// Rotas
const RotaDeficiencia = require('./routes/DeficienciaRoutes');
const RotaUsuario = require('./routes/UsuarioRoutes');
const RotaPessoaFisica = require('./routes/PessoaFisicaRoutes');
const RotaMeioLocomocao = require('./routes/MeioLocomocaoRoutes');
const RotaModalidade = require('./routes/ModalidadeRoutes');
const RotaFuncao = require('./routes/FuncaoRoutes');
const RotaImagem = require('./routes/ImagemRoutes');

app.use('/deficiencia', RotaDeficiencia);
app.use('/usuario', RotaUsuario);
app.use('/associado', RotaPessoaFisica);
app.use('/meioLocomocao', RotaMeioLocomocao);
app.use('/modalidade', RotaModalidade);
app.use('/funcao', RotaFuncao);
app.use('/imagem', RotaImagem);
console.log('Routes configured');

app.use((_, res)=>{
  res.status(404).send("Nada Aqui!")
});

// Definindo a porta que o backend vai rodar
conn
  .sync()
  // .sync({force: true}) // Apaga todas as tabelas e faz novamente
  .then(async () => {
    console.log('Database synchronized');
    await createDefaultAdminUser();
    console.log('Default admin user created');
  
    app.listen(5000, () => {
      console.log('Servidor rodando na porta 5000');
    });
  })
  .catch((err) => console.log('Database sync error:', err));
