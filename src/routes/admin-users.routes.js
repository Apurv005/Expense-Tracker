const express = require("express");
const router = express.Router();
const adminUserController = require("../controllers/admin-users.controllers");

// Define routes
router.get("/get-all-users",adminUserController.getAllUsers);
router.delete("/delete-user/:id",adminUserController.deleteUser);
router.put("/update-user/:id",adminUserController.updateUser);
router.get("/total-users",adminUserController.totalUsers);
router.post("/login",adminUserController.loginAdmin);

// Get all categories
router.get("/", adminUserController.getAllCategories);

// Add a new category
router.post("/", adminUserController.addCategory);

// Delete a category by ID
router.delete("/:id", adminUserController.deleteCategory);
module.exports = router;