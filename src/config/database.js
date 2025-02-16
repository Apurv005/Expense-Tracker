const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
    `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    { dialect: "postgres", logging: false }
  );
  
// Test Connection
const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ PostgreSQL Database connected successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

testDBConnection();

module.exports = sequelize;
