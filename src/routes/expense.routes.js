const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controllers");

// Define routes
router.post("/post-expense", expenseController.postExpense);
router.get("/get-all-expense",expenseController.getAllExpense);

module.exports = router;