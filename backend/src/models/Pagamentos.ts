import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";
import Usuario from "./usuario.js";

const Pagamento = sequelize.define('Pagamento', {
  CD_PAGAMENTO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  TXID_GERENCIANET: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  VALOR: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  NUMERO_PARCELA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  TOTAL_PARCELA: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  DT_CRIACAO: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  DT_PAGAMENTO: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  STATUS: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  LOC_ID_GERENCIANET: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  PIX_COPIA_E_COLA: {
      type: DataTypes.TEXT,
      allowNull: true,
  }
}, {
  tableName: 'PAGAMENTO',
});

Usuario.hasMany(Pagamento, { foreignKey: "CD_USUARIO" });

export default Pagamento;
