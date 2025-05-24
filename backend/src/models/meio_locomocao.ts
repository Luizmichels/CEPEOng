import { DataTypes } from 'sequelize'
import sequelize from "../db/conn.js";

const MeioLocomocao = sequelize.define('MeioLocomocao', {
    CD_MEIO_LOCOMOCAO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_MEIO_LOCOMOCAO: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DS_MEIO_LOCOMOCAO: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'MEIO_LOCOMOCAO',
})

export default MeioLocomocao;