const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/income.controllers");
const authenticateUser = require("../middlewares/authenticateUser");

// Define routes
router.get("/get-all-income",authenticateUser,incomeController.getAllIncome);
router.post("/post-income",authenticateUser, incomeController.postIncome);
router.put("/update-income/:incomeId",authenticateUser,incomeController.editIncome);
router.delete("/delete-income/:incomeId",authenticateUser,incomeController.deleteIncome);

module.exports = router;