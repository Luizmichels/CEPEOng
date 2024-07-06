const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn')
 
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
 
module.exports = Modalidade