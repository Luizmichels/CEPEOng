import { DataTypes } from 'sequelize'
 
// Importando a conexão com o banco
import db from '../db/conn'
 
const Modalidade = db.define("MODALIDADE", {
    CD_MODALIDADE: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_MODALIDADE:{
        type: DataTypes.STRING,
        allowNull: false
    },
    NOMENCLATURA:{
        type: DataTypes.STRING
    }
})
 
export default Modalidade