const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Expense = sequelize.define("expense", {
  id: {
    type: DataTypes.UUID,  // Unique identifier
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: true
  },
  amount: {
    type: DataTypes.FLOAT, // Stores amount in decimal format
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATEONLY, // Only stores YYYY-MM-DD
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,  // Adds createdAt & updatedAt fields
});

module.exports = Expense;
