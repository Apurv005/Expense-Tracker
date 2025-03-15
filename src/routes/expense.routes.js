const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controllers");
const authenticateUser = require("../middlewares/authenticateUser");

// Define routes
router.post("/post-expense",authenticateUser, expenseController.postExpense);
router.get("/get-all-expense",authenticateUser,expenseController.getAllExpense);
router.put("/update-expense/:expenseId",authenticateUser,expenseController.editExpense);
router.delete("/delete-expense/:expenseId",authenticateUser,expenseController.deleteExpense);

module.exports = router;