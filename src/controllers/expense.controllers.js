const Expense = require("../models/exprense.model");

// insert an expenses
exports.postExpense = async (req, res) => {
  const { title, amount, category, date,description } = req.body;
  const user = req.user;
  

  // Check if all required fields are provided
  if (!title || !amount || !category || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create the expense
    const newExpense = await Expense.create({
      title,
      amount,
      description,
      category,
      date,
      user_id: user.id,
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
    const user = req.user; // Extracted from token
    const expenses = await Expense.findAll({ where: { user_id: user.id } });
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


// Edit an expense
exports.editExpense = async (req, res) => {
  // console.log("58:");
  
  const { expenseId } = req.params; // Access expenseId from the URL
  const { title, amount, category, date,description } = req.body;

  try {
    const updatedExpense = await Expense.update(
      { title, amount, category, date,description },
      { where: { id: expenseId } }
    );

    if (updatedExpense[0] === 1) {
      res.status(200).json({ message: "Expense updated successfully!",success: true });
    } else {    
      res.status(404).json({ error: "Expense not found",success: false });
    }
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ error: "Failed to update expense",success: false });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  const { expenseId } = req.params; // Access expenseId from the URL

  try {
    const deletedExpense = await Expense.destroy({ where: { id: expenseId } });

    if (deletedExpense === 1) {
      res.status(200).json({ message: "Expense deleted successfully!",success: true });
    } else {    
      res.status(404).json({ error: "Expense not found",success: false });
    }
  } catch (error) {    
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Failed to delete expense",success: false }); 
  }
};
