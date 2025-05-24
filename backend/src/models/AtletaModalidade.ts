import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

const AtletaModalidade = sequelize.define('AtletaModalidade', {
  CD_ATLETA_MODALIDADE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  tableName: 'ATLETA_MODALIDADE',
});

export default AtletaModalidade;
