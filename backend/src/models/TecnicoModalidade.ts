import { DataTypes, Model } from "sequelize";

class TecnicoModalidade extends Model{
  public CD_TECNICO_MODALIDADE!: number;
}

import sequelize from "../db/conn";

TecnicoModalidade.init({
  CD_TECNICO_MODALIDADE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'TECNICO_MODALIDADE',
});

export default TecnicoModalidade;
