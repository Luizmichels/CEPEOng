const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn')
 
const MeioLocomocao = db.define("MEIO_LOMOCAO", {
    CD_MEIO_LOCOMOCAO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_MEIO_LOCMOCAO:{
        type: DataTypes.STRING,
        allowNull: false
    },
    DS_MEIO_LOMOCAO:{
        type: DataTypes.STRING
    }
})
 
module.exports = MeioLocomocao