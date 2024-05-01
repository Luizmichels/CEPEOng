const express = require('express')
const cors = require('cors')

// Inicioando o express
const app = express()

// Conectou no banco
const conn = require("./db/conn");

// models
const deficiencia = require("./models/deficiencia")
const funcao = require("./models/funcao")
const meio_locom = require("./models/meio_locomocao")
const modalidade = require("./models/modalidade")
const PessoaFisica = require("./models/pessoa_fisica")


// Configurando resposta JSON 
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5000' }))

// Pasta para imagens
app.use(express.static('public'))

// Routes
const RotaDeficiencia = require('./routes/DeficienciaRoutes')
const RotaUsuario = require('./routes/UsuarioRoutes')

app.use('/home/cadastros/deficiencia', RotaDeficiencia)
app.use('/home/cadastros/usuario', RotaUsuario)


// Definindo a porta que o back vai rodar
conn
  .sync()
  //.sync({force: true}) // Apaga todas as tabelas e faz novamente
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));