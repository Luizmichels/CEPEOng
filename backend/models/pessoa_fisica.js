const { DataTypes } = require('sequelize')

// Importando a conexão com o banco
const db = require('../db/conn')

// Importando as outras tabelas
const deficiencia = require("../models/deficiencia")
const funcao = require("../models/funcao")
const equipa_locom = require("../models/meio_locomocao")
const modalidade = require("../models/modalidade")

const PessoaFisica = db.define("PESSOA_FISICA", {
    CD_PESSOA_FISICA: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    NM_PESSOA: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    NR_CELULAR: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    NR_TELEFONE: {
        type: DataTypes.TEXT
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
    MEIO_LOCOMOCAO: {
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
        type: DataTypes.TEXT
    },
    NM_MAE: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    CELULAR_MAE: {
        type: DataTypes.TEXT
    },
    EMAIL_RESPONS: {
        type: DataTypes.TEXT
    },
    NATURALIDADE_RESPONS: {
        type: DataTypes.TEXT
    },
    PESO: {
        type: DataTypes.DECIMAL(3, 3),
        allowNull: false
    },
    ALTURA: {
        type: DataTypes.DECIMAL(3, 3),
        allowNull: false
    },
    RENDA: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    INSTITUICAO: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    MATRICULA: {
        type: DataTypes.TEXT
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
        type: DataTypes.TEXT
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
        type: DataTypes.TEXT
    }
})

// Criando as ligações entres a tabela de pessoa fisica com as outras tabelas

PessoaFisica.belongsToMany(deficiencia, {
    through: 'DEFICIENCIA_PESSOA',
    foreignKey: 'CD_PESSOA_FISICA', // Nome da coluna na tabela de associação referente a PessoaFisica
    otherKey: 'CD_DEFICIENCIA' // Nome da coluna na tabela de associação referente a Deficiencia
});
deficiencia.belongsToMany(PessoaFisica, {
    through: 'DEFICIENCIA_PESSOA',
    foreignKey: 'CD_DEFICIENCIA', // Nome da coluna na tabela de associação referente a Deficiencia
    otherKey: 'CD_PESSOA_FISICA' // Nome da coluna na tabela de associação referente a PessoaFisica
});
PessoaFisica.belongsToMany(modalidade, {
    through: 'MODALIDADE_PESSOA',
    foreignKey: 'CD_PESSOA_FISICA', // Nome da coluna na tabela de associação referente a PessoaFisica
    otherKey: 'CD_MODALIDADE' // Nome da coluna na tabela de associação referente a Modalidade
});
modalidade.belongsToMany(PessoaFisica, {
    through: 'MODALIDADE_PESSOA',
    foreignKey: 'CD_MODALIDADE', // Nome da coluna na tabela de associação referente a Modalidade
    otherKey: 'CD_PESSOA_FISICA' // Nome da coluna na tabela de associação referente a PessoaFisica
});
PessoaFisica.belongsTo(funcao, { foreignKey: 'CD_FUNCAO' }); // Um PessoaFisica pertence a um Calcado
PessoaFisica.belongsTo(equipa_locom, { foreignKey: 'CD_EQUIPA_LOCOMOCAO' }); // Um PessoaFisica pertence a um Calcado


module.exports = PessoaFisica