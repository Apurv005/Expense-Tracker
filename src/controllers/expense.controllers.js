const Expense = require("../models/exprense.model");


// const Expense = require("../models/Expense"); // Sequelize Model
const { encrypt,decrypt } = require("../utils/cryptoUtility");

// Insert an expense (Encrypted)
exports.postExpense = async (req, res) => {
  const { title, amount, category, date, description } = req.body;
  const user = req.user;

  if (!title || !amount || !category || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Encrypt sensitive data before storing
    const encryptedTitle = encrypt(title);
    const encryptedCategory = encrypt(category);
    const encryptedDescription = description ? encrypt(description) : null;

    const newExpense = await Expense.create({
      title: encryptedTitle,
      amount,
      description: encryptedDescription,
      category: encryptedCategory,
      date,
      user_id: user.id,
    });

    res.status(201).json({
      message: "Expense created successfully!",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Failed to create expense" });
  }
};

// Get all expenses (Decrypted)
exports.getAllExpense = async (req, res) => {
  try {
    const user = req.user;
    const expenses = await Expense.findAll({ where: { user_id: user.id } });

    // Decrypt the fetched data
    const decryptedExpenses = expenses.map((expense) => ({
      id: expense.id,
      title: decrypt(expense.title),
      amount: expense.amount,
      category: decrypt(expense.category),
      description: expense.description ? decrypt(expense.description) : null,
      date: expense.date,
    }));

    res.status(200).json({
      message: "Expenses fetched successfully!",
      expenses: decryptedExpenses,
      count: decryptedExpenses.length,
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
};

// Edit an expense (Encrypt Updated Data)
exports.editExpense = async (req, res) => {
  const { expenseId } = req.params;
  const { title, amount, category, date, description } = req.body;

  try {
    const updatedExpense = await Expense.update(
      {
        title: encrypt(title),
        amount,
        category: encrypt(category),
        description: description ? encrypt(description) : null,
        date,
      },
      { where: { id: expenseId } }
    );

    if (updatedExpense[0] === 1) {
      res.status(200).json({ message: "Expense updated successfully!", success: true });
    } else {
      res.status(404).json({ error: "Expense not found", success: false });
    }
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense", success: false });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { expenseId } = req.params;

  try {
    const deletedExpense = await Expense.destroy({ where: { id: expenseId } });

    if (deletedExpense === 1) {
      res.status(200).json({ message: "Expense deleted successfully!", success: true });
    } else {
      res.status(404).json({ error: "Expense not found", success: false });
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense", success: false });
  }
};

