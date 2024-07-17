import { DataTypes, Model } from 'sequelize'

class Deficiencia extends Model {
  public CD_DEFICIENCIA!: number;
  public TP_DEFICIENCIA!: string;
  public NOMENCLATURA!: string;
}

// Importando a conexão com o banco
import sequelize from "../db/conn";

Deficiencia.init({
  CD_DEFICIENCIA: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  TP_DEFICIENCIA: {
    type: DataTypes.STRING,
    allowNull: false
  },
  NOMENCLATURA: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  tableName: 'DEFICIENCIA',
});

export default Deficiencia