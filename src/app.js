const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database");

// Import Routes
const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS

// Routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Expense Tracker API!" });
});

// Sync Database (Optional)
db.sync({ alter: true })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection failed:", err));

module.exports = app;