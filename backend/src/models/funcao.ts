import { DataTypes } from 'sequelize'
import sequelize from "../db/conn.js";

const Funcao = sequelize.define('Funcao', {
  CD_FUNCAO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  NM_FUNCAO: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DS_FUNCAO: {
    type: DataTypes.STRING,
  }
}, {
  tableName: 'FUNCAO',
});

export default Funcao