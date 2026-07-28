require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

async function testConnection() {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connection successful!");
    process.exit(0);
  } catch (error) {
    console.error("Connection failed:", error.message);
    process.exit(1);
  }
}

testConnection();
