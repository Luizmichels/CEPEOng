import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

// Importando as outras tabelas
import deficiencia from "./deficiencia.js";
import funcao from "./funcao.js";
import MeioLocomocao from "./meio_locomocao.js";
import modalidade from "./modalidade.js";
import DeficienciaPessoa from "./DeficienciaPessoa.js";
import Usuario from "./usuario.js";
import AtletaModalidade from "./AtletaModalidade.js";

const PessoaFisica = sequelize.define('PessoaFisica', {
  CD_PESSOA_FISICA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  NM_PESSOA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NR_CELULAR: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NR_TELEFONE: {
    type: DataTypes.TEXT,
  },
  SEXO: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  DT_NASCIMENTO: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  ESTADO_CIVIL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NATURALIDADE: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  EMAIL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  MEIO_LOCOMOCAO: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ASSISTENCIA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NM_PAI: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  CELULAR_PAI: {
    type: DataTypes.TEXT,
  },
  NM_MAE: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  CELULAR_MAE: {
    type: DataTypes.TEXT,
  },
  EMAIL_RESPONS: {
    type: DataTypes.TEXT,
  },
  NATURALIDADE_RESPONS: {
    type: DataTypes.TEXT,
  },
  PESO: {
    type: DataTypes.DECIMAL(6, 3),
    allowNull: false,
  },
  ALTURA: {
    type: DataTypes.DECIMAL(6, 3),
    allowNull: false,
  },
  GP_SANGUE: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  RENDA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ESCOLARIDADE: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  INSTITUICAO: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  MATRICULA: {
    type: DataTypes.TEXT,
  },
  TELEFONE_ESCOLA: {
    type: DataTypes.TEXT,
  },
  CPF: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  RG: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  UF_RG: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  DT_EMISSAO_RG: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  NR_PASSAPORTE: {
    type: DataTypes.TEXT,
  },
  CPF_RESPONS: {
    type: DataTypes.TEXT,
  },
  RG_RESPONS: {
    type: DataTypes.TEXT,
  },
  UF_RG_RESPONS: {
    type: DataTypes.TEXT,
  },
  DT_EMISSAO_RG_RESPONS: {
    type: DataTypes.DATEONLY,
  },
  NR_PASSAPORTE_RESPONS: {
    type: DataTypes.TEXT,
  },
  CEP: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  ENDERECO: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NR_ENDERECO: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  DS_ENDERECO: {
    type: DataTypes.TEXT,
  },
  CLASSIF_FUNC: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  PROVA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  TAMANHO_CAMISA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  TAMANHO_AGASALHO: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  TAMANHO_BERM_CAL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NR_CALCADO: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  FOTO_ATLETA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  FOTO_RG: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  FOTO_RG_RESPONS: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'PESSOA_FISICA',
});

// Criando as ligações entres a tabela de pessoa fisica com as outras tabelas
PessoaFisica.belongsToMany(deficiencia, {
  through: {
    model: DeficienciaPessoa,
  },
  foreignKey: "CD_PESSOA_FISICA",
  constraints: true,
});

deficiencia.belongsToMany(PessoaFisica, {
  through: {
    model: DeficienciaPessoa,
  },
  foreignKey: "CD_DEFICIENCIA",
  constraints: true,
});

PessoaFisica.belongsToMany(modalidade, {
  through: AtletaModalidade,
  foreignKey: "CD_PESSOA_FISICA",
  constraints: true,
});

modalidade.belongsToMany(PessoaFisica, { 
    through: AtletaModalidade, 
    foreignKey: 'CD_MODALIDADE',
    constraints: true 
  });

modalidade.hasMany(PessoaFisica, { foreignKey: "CD_MODALIDADE" });
funcao.hasMany(PessoaFisica, { foreignKey: "CD_FUNCAO" });
MeioLocomocao.hasMany(PessoaFisica, { foreignKey: "CD_EQUIPA_LOCOMOCAO" });
Usuario.hasMany(PessoaFisica, { foreignKey: "CD_USUARIO" });

export default PessoaFisica;
