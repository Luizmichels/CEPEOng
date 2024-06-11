const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn')
 
const Usuario = db.define("USUARIO", {
    CD_USUARIO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_USUARIO:{
        type: DataTypes.STRING,
        allowNull: false
    },
    SENHA:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    NIVEL_ACESSO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
})
 
module.exports = Usuario