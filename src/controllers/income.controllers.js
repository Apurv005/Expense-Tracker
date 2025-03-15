const Income = require("../models/income.model");

// Insert Income
exports.postIncome = async (req, res) => {
  const { source, amount, description, date } = req.body;
  const user = req.user;
  

  // Check if all required fields are provided
  if (!source || !amount || !description || !date) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    // Create the income
    const newIncome = await Income.create({
      source,
      amount,
      description,
      date,
      userId: user.id,
    });

    // Return the created income as response
    res.status(201).json({
      message: "Income credited successfully!",
      income: newIncome,
    });
  } catch (error) {
    console.error("Error crediting the income:", error);
    res.status(500).json({ error: "Failed to credit income" });
  }
};

// Get all incomes
exports.getAllIncome = async (req, res) => {
  try {
    const user = req.user; // Extracted from token
    const incomes = await Income.findAll({ where: { userId: user.id } });
    // Return the created expense as response
    res.status(201).json({
      message: "Income fetched successfully!",
      incomes,
      count: incomes.length,
    });
  } catch (error) {
    console.error("Error creating income:", error);
    res.status(500).json({ error: "Failed to fetch income" });
  }
}

// Edit an income
exports.editIncome = async (req, res) => {
  
  const { incomeId } = req.params; // Access expenseId from the URL
  const { source, amount, date,description } = req.body;

  try {
    const updatedExpense = await Income.update(
      { source, amount, date,description },
      { where: { id: incomeId } }
    );

    if (updatedExpense[0] === 1) {
      res.status(200).json({ message: "Income updated successfully!",success: true });
    } else {    
      res.status(404).json({ error: "Income not found",success: false });
    }
  } catch (error) {
    console.error("Error updating income:", error);
    res.status(500).json({ error: "Failed to update income",success: false });
  }
};

// Delete an income
exports.deleteIncome = async (req, res) => {
  const { incomeId } = req.params; // Access expenseId from the URL
  
  const deletedIncome = await Income.destroy({ where: { id: incomeId } });

  if (deletedIncome === 1) {
    res.status(200).json({ message: "Income deleted successfully!",success: true });
  } else {    
    res.status(404).json({ error: "Income not found",success: false });
  }
  try {

  }catch (error) {    
    console.error("Error deleting income:", error);    
    res.status(500).json({ error: "Failed to delete income",success: false }); 
  }  
};

