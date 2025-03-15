const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const Category = require("../models/categories.model");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Fetch all users from the database
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

exports.deleteUser = async (req,res)=>{
    try {
        const { id } = req.params;
        // Find the user
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the user
        await user.destroy();
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.totalUsers = async (req,res) =>{
    try {
        const totalUsers = await User.count(); // Count all users
        const totalCategories = await Category.count();
        res.json({ totalUsers, totalCategories });
    } catch (error) {
        console.error("Error counting users:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.loginAdmin = async (req, res) => {

    try {
        
    
    const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const adminUser = await User.findOne({ where: { email, role: 0 } });
  
  if (!adminUser) {
    return res.status(401).json({ message: "Invalid credentials or User is not an admin" });
  }

  const isMatch = await bcrypt.compare(password, adminUser.password_hash);
  
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email, role: 0 }, JWT_SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
} catch (error) {
  console.error("Error logging in:", error);
  res.json({ error: "Internal Server Error" });        
}
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;

        // console.log("Updating user with ID:", id);
        
        const { first_name, email, role } = req.body;

        // Validate input
        if (!first_name || !email || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find the user in the database
        const user = await User.findOne({ where: { id } });
        // console.log("user",user);
        

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Update the user details
        user.first_name = first_name;
        user.email = email;
        user.role = role;

        await user.save(); // Save changes

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Error fetching categories" });
    }
};

// Add a new category
exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ error: "Category name is required" });

        const category = await Category.create({ name });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ error: "Error adding category" });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);

        if (!category) return res.status(404).json({ error: "Category not found" });

        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting category" });
    }
};
