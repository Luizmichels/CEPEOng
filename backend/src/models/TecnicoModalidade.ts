import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

const TecnicoModalidade = sequelize.define('TecnicoModalidade', {
  CD_TECNICO_MODALIDADE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  tableName: 'TECNICO_MODALIDADE',
});

export default TecnicoModalidade;
