import { DataTypes } from "sequelize"
import sequelize from "../db/conn.js";

const DeficienciaPessoa = sequelize.define('DeficienciaPessoa', {
    CD_DEFICIENCIA_PESSOA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    tableName: 'DEFICIENCIA_PESSOA'
})

export default DeficienciaPessoa