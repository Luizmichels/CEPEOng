import { DataTypes, Model } from "sequelize";

class AtletaModalidade extends Model {
  public CD_ATLETA_MODALIDADE!: number;
}

import sequelize from "../db/conn";

AtletaModalidade.init({
  CD_ATLETA_MODALIDADE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  sequelize,
  tableName: 'ATLETA_MODALIDADE',
});

export default AtletaModalidade;
