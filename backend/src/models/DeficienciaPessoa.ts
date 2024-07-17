import { DataTypes, Model } from "sequelize"

class DeficienciaPessoa extends Model {
    public CD_DEFICIENCIA_PESSOA!: number;
}

import sequelize from "../db/conn";

DeficienciaPessoa.init({
    CD_DEFICIENCIA_PESSOA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
}, {
    sequelize,
    tableName: 'DEFICIENCIA_PESSOA'
})

export default DeficienciaPessoa