const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn').default
 
const Deficiencia = db.define("DEFICIENCIA", {
    CD_DEFICIENCIA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    TP_DEFICIENCIA:{
        type: DataTypes.STRING,
        allowNull: false
    },
    NOMENCLATURA:{
        type: DataTypes.STRING
    }
})
 
module.exports = Deficiencia