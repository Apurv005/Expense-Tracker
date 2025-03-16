const app = require("./app");
const cors = require("cors");

const PORT = process.env.PORT || 5000;



// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
