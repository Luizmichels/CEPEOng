const express = require('express')
const cors = require('cors')

// Inicioando o express
const app = express()

// Conectou no banco
const conn = require("./db/conn");

// models
const calcado = require("./models/calcado")
const deficiencia = require("./models/deficiencia")
const estado_civil = require("./models/estado_civil")
const funcao = require("./models/funcao")
const meio_locom = require("./models/meio_locomocao")
const modalidade = require("./models/modalidade")
const PessoaFisica = require("./models/pessoa_fisica")
const sexo = require("./models/sexo")
const tamanho = require("./models/tamanho")

// Configurando resposta JSON 
app.use(express.json())

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:5000' }))

// Pasta para imagens
app.use(express.static('public'))

// Routes
const RotaDeficiencia = require('./routes/DeficienciaRoutes')

app.use('/home/cadastros/deficiencia', RotaDeficiencia)


// Definindo a porta que o back vai rodar
conn
  .sync()
  //.sync({force: true}) // Apaga todas as tabelas e faz novamente
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => console.log(err));