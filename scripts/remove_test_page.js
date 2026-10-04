require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const PageView = require("../models/PageView").default || require("../models/PageView");

async function removeTestPages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB.");

    const res = await PageView.deleteMany({ path: { $regex: /test/i } });
    console.log(`Deleted ${res.deletedCount} page view(s) containing "test".`);

    // Let's check remaining paths
    const remaining = await PageView.aggregate([
      { $group: { _id: "$path", count: { $sum: 1 } } }
    ]);
    console.log("Remaining paths in analytics:", remaining);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await mongoose.disconnect();
  }
}

removeTestPages();
