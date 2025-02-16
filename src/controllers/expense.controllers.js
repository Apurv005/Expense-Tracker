const Expense = require("../models/exprense");

// insert an expenses
exports.postExpense = async (req, res) => {
  const { title, amount, category, date, notes } = req.body;

  // Check if all required fields are provided
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create the expense
    const newExpense = await Expense.create({
      title,
      amount,
      category,
      date,
      notes,
    });

    // Return the created expense as response
    res.status(201).json({
      message: "Expense created successfully!",
      expense: newExpense,
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Failed to create expense" });
  }
};

// Get all expenses
exports.getAllExpense = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    // Return the created expense as response
    res.status(201).json({
      message: "Expenses fetched successfully!",
      expenses,
      count: expenses.length,
    });
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ error: "Failed to fetch expense" });
  }
};
