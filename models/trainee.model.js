import { DataTypes } from "sequelize";
import { sequelize } from "../configs/dbConfig.js";

const Trainee = sequelize.define(
  'Trainee',
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: DataTypes.STRING,
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    workplace: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'trainees',
    timestamps: false,
  }
);

export default Trainee;
