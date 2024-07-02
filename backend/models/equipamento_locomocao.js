const { DataTypes } = require('sequelize')
 
// Importando a conexão com o banco
const db = require('../db/conn')
 
const EquipamentoLocomocao = db.define("EQUIPAMENTO_LOCOMOCAO", {
    CD_EQUIPAMENTO_LOCOMOCAO: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_EQUIPAMENTO_LOCOMOCAO:{
        type: DataTypes.STRING,
        allowNull: false
    },
    DS_EQUIPAMENTO_LOCOMOCAO:{
        type: DataTypes.STRING
    }
})
 
module.exports = EquipamentoLocomocao