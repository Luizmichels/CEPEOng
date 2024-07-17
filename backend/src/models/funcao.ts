import { DataTypes, Model } from 'sequelize'

class Funcao extends Model {
  public CD_FUNCAO!: Number;
  public NM_FUNCAO!: string;
  public DS_FUNCAO!: string;
}

// Importando a conexão com o banco
import sequelize from "../db/conn";

Funcao.init({
  CD_FUNCAO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  NM_FUNCAO: {
    type: DataTypes.STRING,
    allowNull: false
  },
  DS_FUNCAO: {
    type: DataTypes.STRING,
  }
},{
  sequelize,
  tableName: 'FUNCAO',
});

export default Funcao