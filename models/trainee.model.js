import { DataTypes } from "sequelize";
import { sequelize } from "../configs/dbConfig.js";

const Trainee = sequelize.define(
  'Trainee',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      validate: {
        len: [4, 50]
      }
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 200]
      } 
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    workplace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^(\+8801|8801|01)[3-9]\d{8}$/,
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'trainees',
    timestamps: true,
  }
);

export default Trainee;
