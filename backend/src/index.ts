import express, { Request, Response } from 'express';
import session from "express-session";
import cors from 'cors';
import createDefaultAdminUser from './helpers/CriarUsarioAdim';
import dotenv from "dotenv";
import pkg from "body-parser";
import { readdir } from 'fs/promises';
import path from 'path';
import bodyParser from "body-parser";

import conn from "./db/conn";
// Rotas
import RotaDeficiencia from './routes/DeficienciaRoutes';
import RotaUsuario from './routes/UsuarioRoutes';
import RotaPessoaFisica from './routes/PessoaFisicaRoutes';
import RotaMeioLocomocao from './routes/MeioLocomocaoRoutes';
import RotaModalidade from './routes/ModalidadeRoutes';
import RotaFuncao from './routes/FuncaoRoutes';
import RotaImagem from './routes/ImagemRoutes';
import RotaDash from './routes/DashRoutes';
import RotaValorPag from './routes/ValorPagamentoRoutes';
import RotaPix from './routes/PixRoutes'
import { fileURLToPath, pathToFileURL } from 'url';
import { readdirSync } from 'fs';

const { json, urlencoded } = pkg;

// Iniciando o express
const app = express();
console.log('Express initialized');
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __dirname = path.dirname(__filename);

dotenv.config({
  path: [path.join(__dirname, "../../.env"), path.join(__dirname, ".env")],
});

const { origin, /* pass, */ secret, nome, debug, PORTA, limit } = process.env;

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
app.use('/dash', RotaDash);
app.use('/valorPag', RotaValorPag);
app.use('/pix', RotaPix);

const getTime = (): number => Date.now() / 1000;

// Novas Rotas De Forma dinamica
async function loaderRoutes(): Promise<void> {
  try {

    const files: string[] = readdirSync(path.join(__dirname, "routes")) as string[];

    const time = getTime();
    const p = files.map(async (file: string) => {
      try {
        const modulePath: string = path.join(__dirname, "routes", file);

        const moduleUrl = pathToFileURL(modulePath).href;

        const { default: module } = await import(moduleUrl);

        if (
          typeof module === "function" &&
          module.name != null &&
          module.stack != null
        ) {
          app.use(
            `/api/${file
              .replace(/\.(js|ts)$/, "")
              .replace(/\\|\//gi, "/")}`,
            module
          );
        }
      } catch (error) {
        console.error("Erro ao carregar rota:", error);
      }
    });

    await Promise.all(p);

    if (debug === "true")
      console.debug("rotas 😼", (getTime() - time).toFixed(2));
    else {
      console.debug = () => {};
    }
    app.use((req, res) => {
      // Tipando `req` e `res` como `any` aqui, mas o ideal seria tipá-los corretamente
      res.sendStatus(404);
    });
  } catch (error) {
    // Tipando `error` como `any` aqui, mas o ideal seria tipá-lo corretamente
    console.error("Erro ao carregar rotas:", error);
  }
}

await loaderRoutes().catch(console.error).finally(async()=>{
  // Definindo a porta que o backend vai rodar
  await conn
    .sync()
    // .sync({force: true}) // Apaga todas as tabelas e faz novamente
    .then(async () => {
      console.log('Database synchronized');
      await createDefaultAdminUser();
      console.log('Default admin user created');
    })
    .catch((err) => console.log('Database sync error:', err));
    
  });

const server = app.listen(PORTA, () => {
      console.log('Servidor rodando na porta 5000');
    });

export default server;
