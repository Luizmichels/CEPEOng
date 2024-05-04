const { DataTypes } = require("sequelize")

const db = require('../db/conn')

const DeficienciaPessoa = db.define('DEFICIENCIA_PESSOA', {
    CD_DEFICIENCIA_PESSOA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = DeficienciaPessoa