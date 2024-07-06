const { DataTypes } = require("sequelize");

const db = require("../db/conn");
const Modalidade = require("./modalidade");
const TecnicoModalidade = require("./TecnicoModalidade");

const Usuario = db.define("USUARIO", {
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
  NIVEL_ACESSO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
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

module.exports = Usuario;
