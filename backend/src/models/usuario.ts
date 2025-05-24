import { DataTypes } from 'sequelize';
import sequelize from "../db/conn.js";
import Modalidade from "./modalidade.js";
import TecnicoModalidade from "./TecnicoModalidade.js";

const Usuario = sequelize.define('Usuario', {
  CD_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  NM_USUARIO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SENHA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  EMAIL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NIVEL_ACESSO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
}, {
  tableName: 'USUARIO',
});

Usuario.belongsToMany(Modalidade, {
  through: TecnicoModalidade,
  foreignKey: "CD_USUARIO",
  constraints: true,
});

Modalidade.belongsToMany(Usuario, {
  through: TecnicoModalidade,
  foreignKey: "CD_MODALIDADE",
  constraints: true,
});

export default Usuario;
