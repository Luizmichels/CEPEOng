import dotenv from "dotenv";
import path from "path";
import { Dialect, Sequelize } from 'sequelize';

dotenv.config({
  path: [path.join(__dirname, "../../.env"), path.join(__dirname, "../.env")],
});

const { host, password, user, database, port, dialect } = process.env;

const sequelize = new Sequelize(database ?? '', user?? '', password, {
  host,
  dialect: (dialect ?? "mysql") as Dialect,
  port: Number(port ?? 3306)
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Conectou");
  } catch (error) {
    console.error("Erro ao conectar:", error);
  }
})();

export default sequelize;
