import { DataTypes, Model } from "sequelize";

class ValorPagamento extends Model {
  public CD_VALOR_PAGAMENTO!: number;
  public VALOR!: number;
}

import sequelize from "../db/conn";

ValorPagamento.init({
  CD_VALOR_PAGAMENTO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  VALOR: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
}, {
  sequelize,
  tableName: 'VALOR_PAGAMENTO',
});

export default ValorPagamento;
