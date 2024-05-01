const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn')
 
const Sexo = db.define("SEXO", {
    CD_SEXO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    TP_SEXO:{
        type: DataTypes.STRING,
        allowNull: false
    }
})
 
module.exports = Sexo