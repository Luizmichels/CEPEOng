const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn').default
 
const MeioLocomocao = db.define("MEIO_LOCOMOCAO", {
    CD_MEIO_LOCOMOCAO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_MEIO_LOCOMOCAO:{
        type: DataTypes.STRING,
        allowNull: false
    },
    DS_MEIO_LOCOMOCAO:{
        type: DataTypes.STRING
    }
})
 
module.exports = MeioLocomocao