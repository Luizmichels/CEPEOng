import { DataTypes, Model } from 'sequelize';
import sequelize from "../db/conn.js";
import Modalidade from "./modalidade.js";
import TecnicoModalidade from "./TecnicoModalidade.js";

class Usuario extends Model {
  public CD_USUARIO!: number;
  public NM_USUARIO!: string;
  public SENHA!: string;
  public readonly NIVEL_ACESSO!: number;
}



Usuario.init({
  CD_USUARIO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  NM_USUARIO: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  SENHA: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  EMAIL: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  NIVEL_ACESSO: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
},{
  sequelize,
  tableName: 'USUARIO',
});

Usuario.belongsToMany(Modalidade, {
  through: TecnicoModalidade,
  foreignKey: "CD_USUARIO",
  constraints: true,
});

Modalidade.belongsToMany(Usuario, {
  through: TecnicoModalidade,
  foreignKey: "CD_MODALIDADE",
  constraints: true,
});

export default Usuario;
