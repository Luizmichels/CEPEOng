import express from 'express';
import session from "express-session";
import cors from 'cors';
import createDefaultAdminUser from './helpers/CriarUsarioAdim';
import dotenv from "dotenv";
import pkg from "body-parser";
import { readdir } from 'fs/promises';
import path from 'path';

import conn from "./db/conn";
// Rotas
import RotaDeficiencia from './routes/DeficienciaRoutes';
import RotaUsuario from './routes/UsuarioRoutes';
import RotaPessoaFisica from './routes/PessoaFisicaRoutes';
import RotaMeioLocomocao from './routes/MeioLocomocaoRoutes';
import RotaModalidade from './routes/ModalidadeRoutes';
import RotaFuncao from './routes/FuncaoRoutes';
import RotaImagem from './routes/ImagemRoutes';


const { json, urlencoded } = pkg;

// Iniciando o express
const app = express();
console.log('Express initialized');

dotenv.config({
  path: [path.join(__dirname, "../.env"), path.join(__dirname, ".env")],
});

const { origin, /* pass, */ secret, nome, debug, PORTA, limit } = process.env;


// Models
// import Deficiencia from "./models/deficiencia";
// import Funcao from "./models/funcao";
// import MeioLocomocao from "./models/meio_locomocao";
// import Modalidade from './models/modalidade';
// import PessoaFisica from "./models/pessoa_fisica";
// import Usuario from "./models/usuario";

// Resolve CORS
app.use(cors({
  origin: JSON.parse(origin ?? "[]"),
  optionsSuccessStatus: 200,
  credentials: true,
}));

// Pasta para imagens
// app.use(express.static('public'));

// inicializasessão
app.use(
  session({
    // store da sessão
    secret: secret as string, // definir
    resave: false,
    saveUninitialized: false,

    name: nome,

    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

// Retorno em JSON
app.use(json({ limit: limit ?? "10mb" }));
app.use(
  urlencoded({
    extended: true,
    limit: limit ?? "10mb",
  })
);



app.use('/deficiencia', RotaDeficiencia);
app.use('/usuario', RotaUsuario);
app.use('/associado', RotaPessoaFisica);
app.use('/meioLocomocao', RotaMeioLocomocao);
app.use('/modalidade', RotaModalidade);
app.use('/funcao', RotaFuncao);
app.use('/imagem', RotaImagem);


const getTime = (): number => Date.now() / 1000;

// Novas Rotas De Forma dinamica

async function loadRoutes(): Promise<void> {
  // Adicionando anotação de tipo para indicar que a função retorna uma promessa que não resolve um valor específico
  try {
    const files: string[] = await readdir(path.join(__dirname, "routes")); // Tipando `files` como um array de strings
    const time = getTime();
    const p: Array<Promise<void>> = files.map(
      // eslint-disable-next-line @typescript-eslint/promise-function-async
      (file: string) =>
        new Promise((resolve) => {
          setTimeout(async () => {
            const modulePath: string = path.join(__dirname, "routes", file); // Tipando `modulePath` como uma string
            const { default: module } = await import(modulePath); // Tipando `module` como um `RequestListener` (função de callback do servidor HTTP)
            if (debug === "true")
              console.debug(
                file.replace(/\.(js|ts)$/, ""),
                (getTime() - time).toFixed(2)
              );

            app.use(`/${file.replace(/\.(js|ts)$/, "")}`, module);
            resolve();
          }, 10);
        })
      // Tipando `file` como uma string e `p` como um array de promessas que não resolvem valores específicos
    );

    await Promise.all(p);

    if (debug === "true")
      console.debug("rotas 😼", (getTime() - time).toFixed(2));

    app.use((req, res) => {
      // Tipando `req` e `res` como `any` aqui, mas o ideal seria tipá-los corretamente
      res.sendStatus(404);
    });
  } catch (error) {
    // Tipando `error` como `any` aqui, mas o ideal seria tipá-lo corretamente
    console.error("Erro ao carregar rotas:", error);
  }
}

loadRoutes().catch(console.error);

// app.use((_, res) => {
//   res.status(404).send("Nada Aqui!")
// });

// Definindo a porta que o backend vai rodar
conn
  .sync()
  // .sync({force: true}) // Apaga todas as tabelas e faz novamente
  .then(async () => {
    console.log('Database synchronized');
    await createDefaultAdminUser();
    console.log('Default admin user created');

    app.listen(PORTA, () => {
      console.log('Servidor rodando na porta 5000');
    });
  })
  .catch((err) => console.log('Database sync error:', err));
