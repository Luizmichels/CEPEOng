const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn')
 
const Calcado = db.define("CALCADO", {
    CD_CALCADO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    TP_CALCADO:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})
 
module.exports = Calcado