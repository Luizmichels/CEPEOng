import { DataTypes } from 'sequelize'
import sequelize from "../db/conn.js";

const Deficiencia = sequelize.define('Deficiencia', {
  CD_DEFICIENCIA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  TP_DEFICIENCIA: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NOMENCLATURA: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'DEFICIENCIA',
});

export default Deficiencia