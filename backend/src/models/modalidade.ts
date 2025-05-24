import { DataTypes } from 'sequelize'
import sequelize from "../db/conn.js";

const Modalidade = sequelize.define('Modalidade', {
    CD_MODALIDADE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_MODALIDADE: {
        type: DataTypes.STRING,
        allowNull: false
    },
    NOMENCLATURA: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'MODALIDADE',
})

export default Modalidade