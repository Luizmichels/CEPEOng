const express = require('express')
const cors = require('cors')

// Iniciando o express
const app = express()

// Conectando ao banco
const conn = require("./db/conn")

// Models
<<<<<<< Updated upstream
const Deficiencia = require("./models/deficiencia")
const Funcao = require("./models/funcao")
const MeioLocomocao = require("./models/meio_locomocao")
const Modalidade = require('./models/modalidade')
const PessoaFisica = require("./models/pessoa_fisica")
const Usuario = require("./models/usuario")
=======
const Deficiencia = require("./models/deficiencia");
const Funcao = require("./models/funcao");
const MeioLocomocao = require("./models/meio_locomocao");
const Modalidade = require("./models/modalidade");
const PessoaFisica = require("./models/pessoa_fisica");
const Usuario = require("./models/usuario");
>>>>>>> Stashed changes

// Configurando resposta JSON
app.use(express.json())

// Resolve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5000' }))

// Pasta para imagens
app.use(express.static('public'))

// Rotas
<<<<<<< Updated upstream
const RotaDeficiencia = require('./routes/DeficienciaRoutes')
const RotaUsuario = require('./routes/UsuarioRoutes')
const RotaPessoaFisica = require('./routes/PessoaFisicaRoutes')
const RotaMeioLocomocao = require('./routes/MeioLocomocaoRoutes')
const RotaModalidade = require('./routes/ModalidadeRoutes')
const RotaFuncao = require ('./routes/FuncaoRoutes')
=======
const RotaDeficiencia = require('./routes/DeficienciaRoutes');
const RotaUsuario = require('./routes/UsuarioRoutes');
const RotaPessoaFisica = require('./routes/PessoaFisicaRoutes');
const RotaMeioLocomocao = require('./routes/MeioLocomocaoRoutes');
const RotaModalidade = require('./routes/ModadlidadeRoutes'); // Adicionando a nova rota
>>>>>>> Stashed changes

app.use('/home/cadastros/deficiencia', RotaDeficiencia)
app.use('/home/cadastros/usuario', RotaUsuario)
app.use('/home/cadastros/associado/', RotaPessoaFisica)
app.use('/home/cadastros/meio_locomocao', RotaMeioLocomocao)
app.use('/home/cadastros/modalidade', RotaModalidade) 
app.use('/home/cadastros/funcao', RotaFuncao) 

// Definindo a porta que o backend vai rodar
conn
  .sync()
  //.sync({force: true}) // Apaga todas as tabelas e faz novamente
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));