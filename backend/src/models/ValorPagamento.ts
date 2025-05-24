import { DataTypes } from "sequelize";
import sequelize from "../db/conn.js";

const ValorPagamento = sequelize.define('ValorPagamento', {
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
  tableName: 'VALOR_PAGAMENTO',
});

export default ValorPagamento;
