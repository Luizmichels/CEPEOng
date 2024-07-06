import { DataTypes } from 'sequelize'
 
// Importando a conexão com o banco
import db from '../db/conn'
 
const Funcao = db.define("FUNCAO", {
    CD_FUNCAO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_FUNCAO:{
        type: DataTypes.STRING,
        allowNull: false
    },
    DS_FUNCAO:{
        type: DataTypes.STRING,
    }
})
 
export default Funcao