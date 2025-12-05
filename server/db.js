
const mongoose = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/queuehire";

async function connectDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose;
    }

    if (mongoose.connection.readyState === 2) {
      return mongoose;
    }

    await mongoose.connect(MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });

    console.log("✅ MongoDB connected");
    return mongoose;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
}

module.exports = { mongoose, connectDB };
