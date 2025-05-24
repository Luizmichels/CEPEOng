import express from 'express';
import session from "express-session";
import cors from 'cors';
import dotenv from "dotenv";
import pkg from "body-parser";
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { readdirSync } from 'fs';

import createDefaultAdminUser from './helpers/CriarUsarioAdim.js';
import conn from "./db/conn.js";

import RotaDeficiencia from './routes/DeficienciaRoutes.js';
import RotaUsuario from './routes/UsuarioRoutes.js';
import RotaPessoaFisica from './routes/PessoaFisicaRoutes.js';
import RotaMeioLocomocao from './routes/MeioLocomocaoRoutes.js';
import RotaModalidade from './routes/ModalidadeRoutes.js';
import RotaFuncao from './routes/FuncaoRoutes.js';
import RotaImagem from './routes/ImagemRoutes.js';
import RotaDash from './routes/DashRoutes.js';
import RotaValorPag from './routes/ValorPagamentoRoutes.js';
import RotaPix from './routes/PixRoutes.js';

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

await loaderRoutes().catch(console.error);

await conn
  .sync()
  .then(async () => {
    console.log('Database synchronized');
    await createDefaultAdminUser();
    console.log('Default admin user created');
  })
  .catch((err: unknown) => console.log('Database sync error:', err));

const server = app.listen(PORTA, () => {
  console.log('Servidor rodando na porta 5000');
});

export default server;
