import { DataTypes, Model } from 'sequelize'

class MeioLocomocao extends Model {
    public CD_MEIO_LOCOMOCAO!: number;
    public NM_MEIO_LOCOMOCAO!: string;
    public DS_MEIO_LOCOMOCAO!: string;
}

// Importando a conexão com o banco
import sequelize from "../db/conn";

MeioLocomocao.init({
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
    sequelize,
    tableName: 'MEIO_LOCOMOCAO',
})

export default MeioLocomocao;