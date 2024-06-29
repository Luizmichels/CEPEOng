const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const TecnicoModalidade = db.define("TECNICO_MODALIDADE", {
  CD_TECNICO_MODALIDADE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = TecnicoModalidade;
