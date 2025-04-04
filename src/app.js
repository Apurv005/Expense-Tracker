const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/database");

// Import Routes
const userRoutes = require("./routes/user.routes");
const expenseRoutes = require("./routes/expense.routes");
const incomeRoutes = require("./routes/income.routes");
const reportRoutes = require("./routes/reports.routes");
const adminUserRoutes = require("./routes/admin-users.routes");

const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cors()); // Enable CORS

console.log("Success!");


// Routes
app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/incomes", incomeRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/admin-users",adminUserRoutes );


// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Expense Tracker API!" });
});

// Sync Database (Optional)
db.sync({ alter: true })
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("Database connection failed:", err));

module.exports = app;