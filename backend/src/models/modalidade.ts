import { DataTypes, Model } from 'sequelize'

class Modalidade extends Model {
    public CD_MODALIDADE!: number;
    public NM_MODALIDADE!: string;
    public NOMENCLATURA!: string;
}

// Importando a conexão com o banco
import sequelize from "../db/conn";

Modalidade.init({
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
    sequelize,
    tableName: 'MODALIDADE',
})

export default Modalidade