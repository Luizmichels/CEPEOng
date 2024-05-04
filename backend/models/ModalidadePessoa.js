const { DataTypes } = require("sequelize")

const db = require('../db/conn')

const ModalidadePessoa = db.define('MODALIDADE_PESSOA', {
    CD_MODALIDADE_PESSOA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = ModalidadePessoa