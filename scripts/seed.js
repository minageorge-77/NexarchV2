const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "../.env.local") });

// Inline Admin Model to avoid Next.js specific imports in standalone script
const AdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  passwordHash: String,
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", AdminSchema);

async function seed() {
  if (!process.env.MONGODB_URI) {
    console.error("Please add MONGODB_URI to .env.local");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const existingAdmin = await Admin.findOne({ email: "admin@nexarch.io" });
    if (existingAdmin) {
      console.log("Admin user already exists. Exiting.");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("Password123!", salt);

    await Admin.create({
      name: "NexArch Admin",
      email: "admin@nexarch.io",
      passwordHash,
    });

    console.log("Admin user seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
