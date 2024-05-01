const { DataTypes } = require('sequelize')

// Importando a conexão com o banco
const db = require('../db/conn')

// Importando as outras tabelas
const deficiencia = require("../models/deficiencia")
const funcao = require("../models/funcao")
const meio_locom = require("../models/meio_locomocao")
const modalidade = require("../models/modalidade")

const PessoaFisica = db.define("PESSOA_FISICA", {
    CD_PESSOA_FISICA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_PESSOA:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    NR_CELULAR: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    SEXO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    DT_NASCIMENTO: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ESTADO_CIVIL: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    NATURALIDADE: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    EMAIL: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ASSISTENCIA: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    NM_PAI: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    CELULAR_PAI: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    NM_MAE: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    CELULAR_MAE: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    EMAIL_RESPONS: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    NATURALIDADE_RESPONS: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    PESO: {
        type: DataTypes.DECIMAL(3,3),
        allowNull: false
    },
    ALTURA: {
        type: DataTypes.DECIMAL(3,3),
        allowNull: false
    },
    RENDA: {
        type: DataTypes.DECIMAL(12.2),
        allowNull: false
    },
    INSTITUICAO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    MATRICULA: {
        type: DataTypes.TEXT,
    },
    TELEFONE_ESCOLA: {
        type: DataTypes.TEXT
    },
    CPF: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    RG: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    UF_RG: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    DT_EMISSAO_RG: {
        type: DataTypes.DATE,
        allowNull: false
    },
    NR_PASSAPORTE: {
        type: DataTypes.TEXT
    },
    CPF_RESPONS: {
        type: DataTypes.TEXT
    },
    RG_RESPONS: {
        type: DataTypes.TEXT
    },
    UF_RG_RESPONS: {
        type: DataTypes.TEXT
    },
    DT_EMISSAO_RG_RESPONS: {
        type: DataTypes.DATE
    },
    NR_PASSAPORTE_RESPONS: {
        type: DataTypes.TEXT
    },
    CEP: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ENDERECO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    NR_ENDERECO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    DS_ENDERECO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    CLASSIF_FUNC: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    PROVA: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    TAMANHO_CAMISA: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    TAMANHO_AGASALHO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    TAMANHO_BERM_CAL: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    NR_CALCADO: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    FOTO_ATLETA: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    FOTO_RG: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    FOTO_RG_RESPONS: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

// Criando as ligações entres a tabela de pessoa fisica com as outras tabelas

PessoaFisica.belongsToMany(deficiencia, { through: 'PessoaFisicaModalidade' }); // Muitos para muitos
deficiencia.belongsToMany(PessoaFisica, { through: 'PessoaFisicaModalidade' }); // Muitos para muitos
PessoaFisica.belongsTo(funcao); // Um PessoaFisica pertence a um Calcado
PessoaFisica.belongsTo(meio_locom); // Um PessoaFisica pertence a um Calcado
PessoaFisica.belongsTo(modalidade); // Um PessoaFisica pertence a um Calcado


module.exports = PessoaFisica