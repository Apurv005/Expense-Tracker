const express = require("express");
const router = express.Router();
const reportsController = require("../controllers/reports.controllers");
const authenticateUser = require("../middlewares/authenticateUser");

// Define routes
router.get("/getReport",authenticateUser, reportsController.getReport);

module.exports = router;