const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }
  
  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"
  // console.log(token);

  try {    
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    // console.log(decoded);
    req.user = decoded; // Attach user data to request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

// Middleware to Protect Admin Routes
const verifyAdminToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "Access denied, token missing" });
  }

  try {
    const verified = jwt.verify(token, SECRET_KEY);
    if (verified.role !== 0) {
      return res.status(403).json({ message: "Unauthorized access" });
    }
    req.admin = verified;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authenticateUser;
