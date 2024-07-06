const { DataTypes } = require("sequelize");
const db = require("../db/conn");

const AtletaModalidade = db.define("ATLETA_MODALIDADE", {
  CD_ATLETA_MODALIDADE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});

module.exports = AtletaModalidade;
