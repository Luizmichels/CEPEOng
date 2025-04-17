import { DataTypes, Model } from "sequelize";

class Pagamento extends Model {
  public CD_PAGAMENTO!: number;
  public TXID_GERENCIANET!: Text;
  public VALOR!: number;
  public NUMERO_PARCELA!: number;
  public TOTAL_PARCELA!: number;
  public DT_CRIACAO!: Date;
  public DT_PAGAMENTO!: Date;
}

import sequelize from "../db/conn";

import Usuario from "./usuario";

Pagamento.init({
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
}, {
  sequelize,
  tableName: 'PAGAMENTO',
});

Usuario.hasMany(Pagamento, { foreignKey: "CD_USUARIO" });

export default Pagamento;
