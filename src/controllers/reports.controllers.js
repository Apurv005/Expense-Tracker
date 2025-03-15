const Income = require("../models/income.model");
const Expense = require("../models/exprense.model");

exports.getReport = async (req,res) => {
    try {
    const userId = req.user.id;
    const totalIncome = await Income.sum("amount", { where: { userId } }) || 0;
    // Calculate total expense
    const totalExpense = await Expense.sum("amount", { where: { user_id: userId } }) || 0;
    res.json({
        data: {
            totalIncome: parseFloat(totalIncome),
            totalExpense: parseFloat(totalExpense),
            balance: parseFloat(totalIncome - totalExpense),
        },
        success : true,
        message: "Report fetched successfully!",
      });  
} catch (error) {
    console.error("Error fetching totals:", error);
    res.status(500).json({ message: "Server Error" });       
}

}