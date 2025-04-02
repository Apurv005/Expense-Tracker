const { Sequelize } = require("sequelize");
require("dotenv").config();

// const sequelize = new Sequelize(
//     `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
//     { dialect: "postgres", logging: false}
//   );


// For Azure Hosting
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST, // Should be the actual IP or domain of your database server
  port: process.env.DB_PORT || 5432, // Default PostgreSQL port
  dialect: "postgres",
  logging: false, // Set to true if you want to debug queries
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Set to true if using a CA certificate
    },
  },
});
  
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
