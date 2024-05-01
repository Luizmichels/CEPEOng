const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn')
 
const Tamanho = db.define("TAMANHO", {
    CD_TAMANHO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    TP_TAMANHO:{
        type: DataTypes.STRING,
        allowNull: false
    }
})
 
module.exports = Tamanho