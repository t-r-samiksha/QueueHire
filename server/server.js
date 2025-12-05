
require('dotenv').config();
const app = require('./app');
const { connectDB } = require("./db");
connectDB();


const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
