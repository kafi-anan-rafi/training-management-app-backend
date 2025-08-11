import { DataTypes } from "sequelize";
import { sequelize } from '../configs/dbConfig.js';

const Admin = sequelize.define (
  'Admin',
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
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6, 100]
        }
    }},
    {
        tableName: 'admins',
        timestamps: true,
    }
  )

  export default Admin;